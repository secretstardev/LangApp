<?php

namespace app\models;

use app\components\Helpers;
use app\components\Notifications;
use app\enums\LanguageLevel;
use app\enums\TariffPeriod;
use app\enums\UserTariff;
use Lcobucci\JWT\Token;
use sizeg\jwt\Jwt;
use Throwable;
use Yii;
use yii\base\InvalidCallException;
use yii\behaviors\AttributeBehavior;
use yii\db\ActiveRecord;
use yii\db\StaleObjectException;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\validators\NumberValidator;
use yii\web\IdentityInterface;
use yii\web\ServerErrorHttpException;
use yii\web\UserEvent;
use DateTime;
use DateTimeImmutable;
use DateTimeZone;
use app\enums\TransactionStatus;

/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string $name
 * @property string $company
 * @property string $site
 * @property string $telephone
 * @property string $email
 * @property string $passwordHash
 * @property string $balance
 * @property string $balancePartner
 * @property string $paidUntilDateTime
 * @property string $registerIp
 * @property string $lastLoginIp
 * @property string $addedDateTime
 * @property string $updatedDateTime
 * @property string $comment
 * @property string $resetPasswordToken
 * @property string $passwordChangedDateTime
 * @property int $isServicePaused
 * @property int $invitedByUserId
 * @property int $isPartner
 * @property int $enablePartnerPayments
 * @property string $partnerPercent
 * @property string $partnerEarned
 * @property string $wmr
 * @property array $dataJson
 * @property string $timezone
 * @property string $language
 * @property string $currency
 * @property string $country
 * @property string $frozeEnablePartnerPayments
 * @property string[] $languages
 * @property array $favoriteCategoryId
 * @property string $languageLevel
 * @property int $dailyGoal
 * @property float $penaltyAmount
 * @property string $tariff
 * @property float $tariffAmount
 * @property string $tariffPeriod
 * @property int $defaultListId
 *
 * @property string $isAdmin
 * @property string $password write-only password (virtual attribute)
 * @property User $invitedByUser
 * @property User[] $invitedUsers
 * @property Transaction[] $transactions
 * @property PaymentMethod[] $paymentMethods
 * @property Invoice[] $invoices
 * @property bool $isPaid
 */
class User extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    public const SCENARIO_INDEX = 'index';
    public const SCENARIO_PROFILE = 'profile';
    public const SCENARIO_ADMIN = 'admin';
    public const SCENARIO_LOGIN = 'login';
    public const SCENARIO_REGISTER = 'register';
    public const SCENARIO_INVITED_USER = 'invited_user';

    protected $_password;

    public static function getBaseCurrency()
    {
        return 'JPY';
    }

    /**
     * @param UserEvent $event
     */
    public static function afterLogin($event)
    {
        /** @var User $user */
        $user = $event->identity;
        Yii::$app->formatter->timeZone = $user->timezone;
    }

    public function autoCreateDictionaryList()
    {
        if (empty($this->defaultListId)) {
            $transaction = Yii::$app->db->beginTransaction();
            try {
                $list = new UserDictionaryList(['userId' => $this->id, 'name' => 'Main Dictionary']);
                if (($valid = $list->save())) {
                    $this->defaultListId = $list->id;
                    $valid = $valid && $this->save(false, ['defaultListId']);
                }

                $valid ? $transaction->commit() : $transaction->rollBack();
            } catch (\Exception $e) {
                $transaction->rollBack();
                Yii::error($e);
            }
            $this->refresh();
        }
    }

    public function checkInvitedUsers()
    {
        foreach ($this->invitedUsers as $user) {
            foreach ($user->transactions as $transaction) {
                $transaction->checkInvitedBy($user);
            }

            $user->updatePartnerEarned();
        }

        $this->updateBalance();
    }

    public function getRestorePasswordLink()
    {
        $this->generateResetPasswordToken();

        // TODO: link should point to frontend
        $url = Yii::$app->params['baseUrl'] . Url::to([
                'users/restore-password',
                'id' => $this->id,
                'code' => $this->resetPasswordToken,
            ]);

        return $url;
    }

    public function generateResetPasswordToken($save = true, $forceRegenerate = false)
    {
        if ($forceRegenerate || !User::isPasswordResetTokenValid($this->resetPasswordToken)) {
            $this->resetPasswordToken = Yii::$app->security->generateRandomString() . '_' . time();

            if ($save) {
                $this->save(false, ['resetPasswordToken']);
            }
        }
    }

    /**
     * @param string $token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {
        if (!User::isPasswordResetTokenValid($token)) {
            return null;
        }

        return User::findOne(['resetPasswordToken' => $token]);
    }

    /**
     * @param string $token
     * @return bool
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $pos = strrpos($token, '_');
        if ($pos === false) {
            return false;
        }

        $timestamp = (int) substr($token, $pos + 1);
        $expire = 60 * 60 * 24;

        return $timestamp + $expire >= time();
    }

    public function updateBalance($recalculateCommon = true)
    {
        if ($recalculateCommon) {
            Transaction::recalculateCommonForUser($this);
        }

        $balance = (float) Yii::$app->db->createCommand(
            'SELECT SUM(money) FROM transactions WHERE "userId" = :userId AND "isPartner" = 0 AND "status" = :status;',
            [':userId' => $this->id, ':status' => TransactionStatus::SUCCESS]
        )->queryScalar();
        $balancePartner = (float) Yii::$app->db->createCommand(
            'SELECT SUM(money) FROM transactions WHERE "userId" = :userId AND "isPartner" = 1 AND "status" = :status;',
            [':userId' => $this->id, ':status' => TransactionStatus::SUCCESS]
        )->queryScalar();

        if ($balance != $this->balance || $balancePartner != $this->balancePartner) {
            $this->balance = $balance;
            $this->balancePartner = $balancePartner;

            $this->save(false, ['balance', 'balancePartner']);
        }
        //$this->notifyLowBalance();
    }

    public function updatePartnerEarned()
    {
        $partnerEarned = Yii::$app->db->createCommand(
            'SELECT SUM(money) FROM transactions WHERE "fromInvitedUserId" = :fromInvitedUserId AND "userId" = :userId AND "isPartner" = 1;',
            [':fromInvitedUserId' => $this->id, ':userId' => $this->invitedByUserId]
        )->queryScalar();

        $this->partnerEarned = $partnerEarned;

        $this->save(false, ['partnerEarned']);
    }

    public function scenarios()
    {
        return [
            static::SCENARIO_LOGIN => ['email', 'password'],
            static::SCENARIO_REGISTER => [
                'name',
                'company',
                'site',
                'telephone',
                'email',
                'password',
                'timezone',
                'invitedByUserId',
                'timezone',
                'language',
                'currency',
                'country',
                'languages',
                'tariff',
                'penaltyAmount',
                'languageLevel',
                'favoriteCategoryId',
                'dailyGoal',
            ],
            static::SCENARIO_PROFILE => [
                'name',
                'company',
                'site',
                'telephone',
                'email',
                'password',
                'isServicePaused',
                'wmr',
                'timezone',
                'language',
                'country',
                'isAdmin',
                'languages',
                'extensionSettings',
                'tariff',
                'penaltyAmount',
                'languageLevel',
                'favoriteCategoryId',
                'dailyGoal',
            ],
            static::SCENARIO_ADMIN => [
                'name',
                'company',
                'site',
                'telephone',
                'email',
                'password',
                'comment',
                'isServicePaused',
                'invitedByUserId',
                'isPartner',
                'enablePartnerPayments',
                'frozeEnablePartnerPayments',
                'partnerPercent',
                'wmr',
                'timezone',
                'language',
                'isAdmin',
                'accessToken',
                'currency',
                'country',
                'languages',
                'extensionSettings',
                'tariff',
                'penaltyAmount',
                'languageLevel',
                'favoriteCategoryId',
                'dailyGoal',
            ],
        ];
    }

    public function getNotifications()
    {
        return Notifications::getForUser($this);
    }

    public function getConfig()
    {
        return [
            'availableCurrencyList' => User::getAvailableCurrencyList(),
            'baseCurrency' => User::getBaseCurrency(),
        ];
    }

    public function fields()
    {
        if ($this->scenario == static::SCENARIO_INVITED_USER) {
            return ['id', 'name', 'partnerEarned', 'isPaid'];
        } elseif ($this->scenario == static::SCENARIO_PROFILE) {
            return [
                'id',
                'name',
                'company',
                'site',
                'telephone',
                'email',
                'balance',
                'balancePartner',
                'paidUntilDateTime' => [Helpers::class, 'formatDateField'],
                'isServicePaused',
                'isPartner',
                'partnerPercent',
                'wmr',
                'timezone',
                'language',
                'isAdmin',
                'notifications',
                'currency',
                'config',
                'languages',
                'extensionSettings',
                'isPaid',
                'tariff',
                'tariffAmount',
                'tariffPeriod',
                'penaltyAmount',
                'languageLevel',
                'favoriteCategoryId',
                'dailyGoal',
                'avatar',
                'defaultListId',
            ];
        } elseif ($this->scenario == static::SCENARIO_INDEX || Helpers::isAdmin()) {
            $fields = parent::fields();
            $fields['paidUntilDateTime'] = [Helpers::class, 'formatDateField'];
            $fields['addedDateTime'] = [Helpers::class, 'formatDateField'];
            $fields['updatedDateTime'] = [Helpers::class, 'formatDateField'];
            $fields['isAdmin'] = 'isAdmin';
            $fields['accessToken'] = 'token';
            $fields['extensionSettings'] = 'extensionSettings';
            $fields['isPaid'] = 'isPaid';
            $fields['avatar'] = 'avatar';
            unset($fields['passwordHash']);

            return $fields;
        } else {
            return [];
        }
    }

    public function behaviors()
    {
        return [
            [
                'class' => AttributeBehavior::class,
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['addedDateTime', 'updatedDateTime'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => 'updatedDateTime',
                ],
                'value' => function ($event) {
                    return Helpers::dateToSql(time());
                },
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    public static function getAvailableCurrencyList()
    {
        return ArrayHelper::getValue(Yii::$app->params, ['currency', 'supported', 'symbols'], ['USD' => '$']);
    }

    public function getDefaultCurrency()
    {
        return ArrayHelper::getValue(Yii::$app->params, ['currency', 'default'], 'USD');
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'email', 'password'], 'required', 'on' => static::SCENARIO_REGISTER],
            ['email', 'email'],
            ['email', 'filter', 'filter' => 'strtolower'],
            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'unique'],
            ['password', 'filter', 'filter' => 'trim'],
            [['balance', 'balancePartner', 'partnerPercent', 'partnerEarned'], 'number'],
            [
                [
                    'isAdmin',
                    'paidUntilDateTime',
                    'addedDateTime',
                    'updatedDateTime',
                    'restorePasswordUntilDate',
                    'passwordChangedDateTime',
                    'dataJson',
                ],
                'safe',
            ],
            [['comment'], 'string'],
            [
                [
                    'isServicePaused',
                    'invitedByUserId',
                    'isPartner',
                    'enablePartnerPayments',
                    'frozeEnablePartnerPayments',
                ],
                'default',
                'value' => 0,
            ],
            [['isPartner'], 'default', 'value' => 1],
            [['isServicePaused'], 'boolean'],
            [['invitedByUserId', 'isPartner', 'enablePartnerPayments', 'frozeEnablePartnerPayments'], 'integer'],
            [
                [
                    'name',
                    'company',
                    'site',
                    'telephone',
                    'email',
                    'password',
                    'registerIp',
                    'lastLoginIp',
                    'restorePasswordKey',
                    'wmr',
                    'timezone',
                ],
                'string',
                'max' => 255,
            ],
            ['currency', 'default', 'value' => $this->getDefaultCurrency()],
            ['currency', 'in', 'range' => array_keys(User::getAvailableCurrencyList())],
            ['country', 'safe'],
            //['languages', 'in', 'range' => ],
            ['languages', 'each', 'rule' => ['string']],
            ['penaltyAmount', 'validatePenaltyAmount'],
            ['tariff', 'default', 'value' => UserTariff::FREE],
            ['tariff', 'in', 'range' => Tariff::getValidSlugs()],
            ['languageLevel', 'in', 'range' => LanguageLevel::values()],
            [
                'favoriteCategoryId',
                'each',
                'skipOnError' => true,
                'rule' => [
                    'exist',
                    'skipOnError' => true,
                    'targetClass' => Category::class,
                    'targetAttribute' => ['favoriteCategoryId' => 'id'],
                ],
            ],
            ['dailyGoal', 'integer', 'min' => 300],
            ['extensionSettings', 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Name'),
            'company' => Yii::t('app', 'Company'),
            'site' => Yii::t('app', 'Site'),
            'telephone' => Yii::t('app', 'Telephone'),
            'email' => Yii::t('app', 'E-mail'),
            'password' => Yii::t('app', 'Password'),
            'balance' => Yii::t('app', 'Balance'),
            'balancePartner' => Yii::t('app', 'Partner Balance'),
            'paidUntilDateTime' => Yii::t('app', 'Paid Until Date Time'),
            'registerIp' => Yii::t('app', 'Register Ip'),
            'lastLoginIp' => Yii::t('app', 'Last Login Ip'),
            'addedDateTime' => Yii::t('app', 'Added'),
            'updatedDateTime' => Yii::t('app', 'Updated Date Time'),
            'comment' => Yii::t('app', 'Comment'),
            'restorePasswordKey' => Yii::t('app', 'Restore Password Key'),
            'restorePasswordUntilDate' => Yii::t('app', 'Restore Password Until Date'),
            'passwordChangedDateTime' => Yii::t('app', 'Password Changed Date Time'),
            'isServicePaused' => Yii::t('app', 'Is Service Paused'),
            'invitedByUserId' => Yii::t('app', 'Invited By User ID'),
            'isPartner' => Yii::t('app', 'Is Partner'),
            'enablePartnerPayments' => Yii::t('app', 'Enable Partner Payments'),
            'frozeEnablePartnerPayments' => Yii::t('app', 'Froze "Enable Partner Payments"'),
            'partnerPercent' => Yii::t('app', 'Partner Percent'),
            'partnerEarned' => Yii::t('app', 'Partner Earned'),
            'wmr' => Yii::t('app', 'WMR'),
            'dataJson' => Yii::t('app', 'Data Json'),
            'timezone' => Yii::t('app', 'Timezone'),
            'isAdmin' => Yii::t('app', 'Is Admin'),
            'languages' => Yii::t('app', 'Languages'),
        ];
    }

    public function getPassword()
    {
        return $this->_password;
    }

    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     * @throws \yii\base\Exception
     */
    public function setPassword($password)
    {
        if (!empty($password)) {
            $this->passwordHash = Yii::$app->security->generatePasswordHash($password);
            $this->passwordChangedDateTime = Helpers::dateToSql(time());
        }
        $this->_password = $password;
    }

    /**
     * @param $email
     * @return User|null
     */
    public static function findByEmail($email)
    {
        return static::find()->where(['email' => strtolower(trim($email))])->one();
    }

    /**
     * Finds an identity by the given ID.
     * @param string|int $id the ID to be looked for
     * @return IdentityInterface the identity object that matches the given ID.
     *                           Null should be returned if such an identity cannot be found
     *                           or the identity is not in an active state (disabled, deleted, etc.)
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * Finds an identity by the given token.
     * @param mixed $tokenString the token to be looked for
     * @param mixed $type the type of the token. The value of this parameter depends on the implementation.
     *                    For example, [[\yii\filters\auth\HttpBearerAuth]] will set this parameter to be `yii\filters\auth\HttpBearerAuth`.
     * @return IdentityInterface the identity object that matches the given token.
     *                           Null should be returned if such an identity cannot be found
     *                           or the identity is not in an active state (disabled, deleted, etc.)
     */
    public static function findIdentityByAccessToken($tokenString, $type = null)
    {
        /** @var Token $token */
        $token = Yii::$app->jwt->loadToken($tokenString);
        if ($token === null) {
            return null;
        }
        $userId = $token->getClaim('uid');
        $user = static::findOne($userId);

        if ($user == null) {
            return null;
        }

        $issuedAt = $token->getClaim('iat');
        $passwordChanged = Helpers::dateToUnix($user->passwordChangedDateTime);

        if ($issuedAt < $passwordChanged) {
            return null;
        }

        return $user;
    }

    public function generateAccessToken()
    {
        $signer = new \Lcobucci\JWT\Signer\Hmac\Sha256();
        /** @var Jwt $jwt */
        $jwt = Yii::$app->jwt;
        $token = $jwt->getBuilder()
            ->setIssuedAt(time())
            ->set('uid', $this->id)
            ->sign($signer, $jwt->key)
            ->getToken();

        return (string) $token;
    }

    /**
     * Returns an ID that can uniquely identify a user identity.
     * @return string|int an ID that uniquely identifies a user identity.
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Returns a key that can be used to check the validity of a given identity ID.
     *
     * The key should be unique for each individual user, and should be persistent
     * so that it can be used to check the validity of the user identity.
     *
     * The space of such keys should be big enough to defeat potential identity attacks.
     *
     * This is required if [[User::enableAutoLogin]] is enabled. The returned key will be stored on the
     * client side as a cookie and will be used to authenticate user even if PHP session has been expired.
     *
     * Make sure to invalidate earlier issued authKeys when you implement force user logout, password change and
     * other scenarios, that require forceful access revocation for old sessions.
     *
     * @return string a key that is used to check the validity of a given identity ID.
     * @throws \Exception
     * @see validateAuthKey()
     */
    public function getAuthKey()
    {
        throw new \Exception('Not implemented');
    }

    /**
     * Validates the given auth key.
     *
     * This is required if [[User::enableAutoLogin]] is enabled.
     * @param string $authKey the given auth key
     * @return bool whether the given auth key is valid.
     * @throws \Exception
     * @see getAuthKey()
     */
    public function validateAuthKey($authKey)
    {
        throw new \Exception('Not implemented');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getInvoices()
    {
        return $this->hasMany(\app\models\Invoice::class, ['userId' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransactions()
    {
        return $this->hasMany(\app\models\Transaction::class, ['userId' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPaymentMethods()
    {
        return $this->getAllPaymentMethods()->where(['isDeleted' => false]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAllPaymentMethods()
    {
        return $this->hasMany(\app\models\PaymentMethod::class, ['userId' => 'id'])->orderBy(['id' => SORT_DESC]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getInvitedByUser()
    {
        return $this->hasOne(\app\models\User::class, ['id' => 'invitedByUserId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getInvitedUsers()
    {
        return $this->hasMany(\app\models\User::class, ['invitedByUserId' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDrillReviews()
    {
        return $this->hasMany(\app\models\DrillReview::class, ['userId' => 'id']);
    }

    public function getIsAdmin()
    {
        $roles = array_keys(\Yii::$app->authManager->getRolesByUser($this->id));

        return in_array('admin', $roles);
    }

    public function getToken()
    {
        return $this->generateAccessToken();
    }

    public function getExtensionSettings()
    {
        return $this->dataJson['extensionSettings'] ?? [
            'clickModifier' => 'DoubleClick'
        ];
    }

    public function getAvatar()
    {
        return '/assets/default-avatar.jpg';
    }

    public function setExtensionSettings($value)
    {
        if (!is_array($value)) {
            $this->addError('extensionSettings', 'extentionSettings should be an array.');

            return false;
        } else {
            $dataJson = $this->dataJson;
            $dataJson['extensionSettings'] = $value;
            $this->dataJson = $dataJson;

            return true;
        }
    }

    /**
     * Is service paid.
     * @return bool
     */
    public function getIsPaid(): bool
    {
        return Helpers::dateToUnix($this->paidUntilDateTime) > time();
    }

    /**
     * @return DateTimeImmutable
     * @throws \Exception
     */
    public function getLastActivityStatDate()
    {
        $value = ArrayHelper::getValue($this->dataJson, ['lastActivityStateDate']);
        if ($value !== null) {
            $datetime = DateTimeImmutable::createFromFormat('Y-m-d', $value, $this->getDateTimeZone())->setTime(0, 0, 0);
        } else {
            $datetime = (new DateTimeImmutable($this->addedDateTime))->modify('-1 day')->setTime(0, 0, 0);
        }

        if ($datetime === false) {
            throw new \Exception('Unable to create DateTime object from lastActivityStateDate.');
        }

        return $datetime;
    }

    /**
     * @param DateTime $value
     * @return bool
     */
    public function setLastActivityStatDate($value)
    {
        $this->setDataJsonItem('lastActivityStateDate', $value->format('Y-m-d'));
        return true;
    }

    /**
     * @param string $key
     * @param mixed $value
     * @return void
     */
    protected function setDataJsonItem($key, $value)
    {
        $dataJson = $this->dataJson;
        $dataJson[$key] = $value;
        $this->dataJson = $dataJson;
    }

    /**
     * @param string $date
     * @return bool
     */
    public function processActivityPenalty($date)
    {
        if (empty($this->penaltyAmount) || $this->penaltyAmount <= 0) {
            return true;
        }

        if ($this->tariff !== UserTariff::FREE) {
            throw new InvalidCallException('This function can only be called by "free" tariff user');
        }

        $query = Transaction::find()
            ->andWhere(['userId' => $this->id])
            ->andWhere(['status' => TransactionStatus::SUCCESS])
            ->andWhere(["[[dataJson]]->>'activityPenaltyDate'" => $date]);

        $hasPenalty = $query->exists();
        if ($hasPenalty) {
            return true;
        }

        $debitBalance = new Transaction([
            'money' => -1.0 * $this->penaltyAmount,
            'currency' => $this->currency,
            'userId' => $this->id,
            'status' => TransactionStatus::SUCCESS,
            'isRealMoney' => 1,
            'addedDateTime' => Helpers::dateToSql(time()),
            'scenario' => Transaction::SCENARIO_USER,
            'dataJson' => [
                'activityPenaltyDate' => $date
            ],
            'comment' => 'Activity Penalty for ' . $date,
        ]);

        if (!$debitBalance->save()) {
            throw new ServerErrorHttpException('Unable to create transaction to debit funds.');
        }

        // Iterating over all user's payment methods and trying to debit funds.
        foreach ($this->paymentMethods as $paymentMethod) {
            // Continue the loop if $paymentMethod isn't active or has faulty transactions in last 24 hours.
            if (!$paymentMethod->isActive || $paymentMethod->hasFaultyTransactionsInLast24h()) {
                continue;
            }

            $transaction = $paymentMethod->debitFunds($this->penaltyAmount, $this->currency);
            if ($transaction->status === TransactionStatus::SUCCESS) {
                return true;
            }
        }

        // reach here, means all payment methods failed, disable user
        $this->paidUntilDateTime = Helpers::dateToSql(time());
        $this->save(false, ['paidUntilDateTime']);
        return false;
    }

    /**
     * Try to charge subscription (if necessary) using one of available payment methods added by user
     * Returns ['status' => boolean, 'message' => string]
     * @return array
     * @throws ServerErrorHttpException|StaleObjectException|Throwable
     */
    public function paySubscriptionIfNecessary(): array
    {
        if ($this->isServicePaused == 1) {
            return ['status' => false, 'message' => Yii::t('app', 'You disabled subscription renewal. Please enable subscription to continue using the service.')];
        }

        $timeNow = time();
        $oneDayUnix = 3600 * 24;

        // Is the service paid for more than one day?
        if (Helpers::dateToUnix($this->paidUntilDateTime) > $timeNow + $oneDayUnix) {
            return ['status' => true, 'message' => Yii::t('app', 'Your subscription is already renewed.')];
        }

        // Has user pending transactions?
        $hasPendingTransactions = Transaction::find()->where([
            'and',
            ['userId' => $this->id],
            ['status' => TransactionStatus::PROCESSING],
        ])->exists();
        if ($hasPendingTransactions) {
            return ['status' => false, 'message' => Yii::t('app', "We're currently processing transaction to renew your subscription. Please try again later.")];
        }

        [$amount, $currency] = $this->getSubscriptionPaymentAmount();

        if ($this->currency != $currency) {
            throw new \RuntimeException('user currency != returned from getSubscriptionPaymentAmount()');
        }
        if ($this->balance < $amount - 0.01) {
            // Iterating over all user's payment methods and trying to debit funds.
            foreach ($this->paymentMethods as $paymentMethod) {
                // Continue the loop if $paymentMethod isn't active or has faulty transactions in last 24 hours.
                if (!$paymentMethod->isActive || $paymentMethod->hasFaultyTransactionsInLast24h()) {
                    continue;
                }

                // If user has negative balance, then we need to also pay off the debt.
                if ($this->balance < 0) {
                    $amount += $this->balance * -1;
                }

                // Debit funds and receive transaction with details.
                $transaction = $paymentMethod->debitFunds($amount, $currency);

                // If transaction status is success, then prolong the subscription and return true.
                if ($transaction->status === TransactionStatus::SUCCESS) {
                    try {
                        if ($this->renewSubscription($paymentMethod->id) === false) {
                            throw new ServerErrorHttpException("Failed to renew the subscription for user $this->id");
                        }
                    } catch (Throwable $e) {
                        throw $e;
                    }

                    return ['status' => true, 'message' => Yii::t('app', 'Your subscription was successfully renewed.')];
                }
            }
        } else {
            if ($this->renewSubscription(0) === false) {
                throw new ServerErrorHttpException("Failed to renew the subscription for user $this->id");
            }

            return ['status' => true, 'message' => Yii::t('app', 'Your subscription was successfully renewed.')];
        }

        return ['status' => false, 'message' => Yii::t('app', 'Unable to renew subscription. Please try again using other card or payment method.')];
    }

    /**
     * Renews the user subscription for n days.
     * @param int $paymentMethodId
     * @return bool
     * @throws ServerErrorHttpException
     * @throws StaleObjectException
     * @throws Throwable
     */
    private function renewSubscription(int $paymentMethodId): bool
    {
        if (!TariffPeriod::isValid($this->tariffPeriod)) {
            throw new ServerErrorHttpException("Invalid Tariff Period !!");
        }

        $timeNow = time();
        $timeFrom = max($timeNow, Helpers::dateToUnix($this->paidUntilDateTime));
        $timeAdded = TariffPeriod::calculateTimeToBeAdded($this->tariffPeriod);
        $newPaidUntilDateTime = Helpers::dateToSql($timeFrom + $timeAdded);

        [$amount, $currency] = $this->getSubscriptionPaymentAmount();
        if ($amount <= 0) {
            $this->paidUntilDateTime = $newPaidUntilDateTime;
            return $this->update(false, ['paidUntilDateTime']);
        } else {
            $transaction = new Transaction([
                'money' => -$amount,
                'currency' => $currency,
                'userId' => $this->id,
                'paymentMethodId' => $paymentMethodId,
                'status' => TransactionStatus::PROCESSING,
                'isRealMoney' => 1,
                'addedDateTime' => Helpers::dateToSql($timeNow),
                'scenario' => Transaction::SCENARIO_USER,
                'dataJson' => [
                    'renewDays' => (int) ($timeAdded / (24 * 3600)),
                    'renewPeriod' => $this->tariffPeriod,
                    'paidUntilDateTimeBefore' => $this->paidUntilDateTime,
                    'paidUntilDataTimeAfter' => $newPaidUntilDateTime,
                ],
                'comment' => 'Renewal of subscription.',
            ]);
            if (!$transaction->save(false)) {
                throw new ServerErrorHttpException("Failed to save the transaction for unknown reason.");
            }
            $this->paidUntilDateTime = $newPaidUntilDateTime;
            $transaction->status = $this->update(false, ['paidUntilDateTime'])
                ? TransactionStatus::SUCCESS
                : TransactionStatus::FAILED;

            if (!$transaction->update(false, ['status'])) {
                throw new ServerErrorHttpException("Failed to update a transaction status for unknown reason.");
            }

            Yii::info('Renewed subscription. Transaction: ' . json_encode($transaction->attributes, JSON_THROW_ON_ERROR));

            return $transaction->status === TransactionStatus::SUCCESS;
        }
    }

    /**
     * Returns the amount to pay the subscription.
     * @return array
     */
    private function getSubscriptionPaymentAmount(): array
    {
        return [$this->tariffAmount, $this->currency];
    }

    /**
     * @return DateTimeZone
     */
    public function getDateTimeZone()
    {
        try {
            return new DateTimeZone($this->timezone ?? Yii::$app->timeZone);
        } catch (Throwable $e) {
        }

        return new DateTimeZone(Yii::$app->timeZone);
    }

    /**
     * @param string $attribute
     * @param array $options
     * @return void
     */
    public function validatePenaltyAmount($attribute, $options = [])
    {
        if ($this->tariff !== UserTariff::FREE) {
            return;
        }
        $value = $this->getAttribute($attribute);

        // Allow current penalty amount if it's not changed.
        if ($value > 0 && abs($this->getOldAttribute($attribute) - $value) < PHP_FLOAT_EPSILON) {
            return;
        }

        $validator = new NumberValidator(['min' => 1]);
        if (($tariff = Tariff::findBySlug($this->tariff)) instanceof Tariff) {
            $validator->min = $tariff->getPenaltyMinAmount($this->country, $this->currency);
        }

        if (!$validator->validate($value, $error)) {
            $this->addError($attribute, $error);
        }
    }

    /**
     * auto fill the value or tariffAmount
     * @return void
     * @throws \Exception
     */
    protected function autoFillTariffData()
    {
        if ($this->hasAttribute('tariffAmount') && $this->hasAttribute('tariffPeriod')) {
            if (empty($this->tariff) || $this->tariff === UserTariff::FREE) {
                $this->tariffAmount = 0;
                $this->tariffPeriod = 'day';
            } elseif (($tariff = Tariff::findBySlug($this->tariff)) instanceof Tariff) {
                // Reset paidUntilDateTime if user was free and now is not
                if ($this->getOldAttribute('tariff') == UserTariff::FREE) {
                    $this->paidUntilDateTime = Helpers::dateToSql(time() - 1);
                }
                $this->tariffAmount = $tariff->getAmountByCountryCurrency($this->country, $this->currency);
                $this->tariffPeriod = $tariff->period;
            }
        }
    }

    public function beforeSave($insert)
    {
        $this->autoFillTariffData();
        return parent::beforeSave($insert);
    }

    public function afterFind()
    {
        $this->autoCreateDictionaryList();
        parent::afterFind();
    }
}

import { Controller, Get, UseGuards, Req, Post, HttpCode, Query, HttpException, HttpStatus, Body, Logger, Patch, UsePipes, ValidationPipe, DefaultValuePipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNotEmpty } from 'class-validator';
import { groupBy, max, mean, sum } from 'lodash';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaidGuard } from 'src/auth/paid.guard';
import { RequestWithUser } from 'src/auth/RequestWithUser';
import { UserDictionary } from 'src/entities/UserDictionary';
import { In, Repository } from 'typeorm';
import { DrillsGenerator } from './drills.generator';
import { Drill } from './drills.interfaces';
import { CardAnswer, SrsService } from './srs.service';
import { UpdateDrillSettingsBodyDto, DrillSettings } from './dto/drill.settings.dto';
import { DrillsHideDto } from './dto/drills.hide.dto';

export class ReportProgressBody {
  @IsNotEmpty()
  drills: Drill[];
}

@Controller('drills')
export class DrillsController {
  private readonly logger = new Logger(DrillsController.name, { timestamp: true });

  constructor(
    private moduleRef: ModuleRef,
    @InjectRepository(UserDictionary)
    private userDictionaryRepository: Repository<UserDictionary>,
    private srsService: SrsService,
  ) {}

  @UseGuards(JwtAuthGuard, PaidGuard)
  @Post('report-progress')
  @HttpCode(200)
  async postReportProgress(@Req() req: RequestWithUser, @Body() body: ReportProgressBody) {
    const user = req.user;
    const drills = body.drills;

    const drillsById = groupBy(drills, 'trackBy');
    const userWords = await this.userDictionaryRepository.find({
      where: {
        user_id: user.id,
        dictionary_word_id: In(Object.keys(drillsById)),
      },
    });

    let promises = [];
    for (const [id, drillsGroup] of Object.entries(drillsById)) {
      // If has unfinished
      if (drillsGroup.findIndex((d) => !d.isFinished) !== -1) {
        continue;
      }
      const latestAnswerTime = max(drillsGroup.map((d) => d.answerEndTime));
      if (latestAnswerTime == 0) {
        this.logger.warn(`Strange: latestAnswerTime is 0 for drills with trackId ${id}`);
        continue;
      }
      let userWord = userWords.find((w) => w.dictionary_word_id == Number(id));
      // If not changed
      if (Math.abs(userWord.drill_last.getTime() - latestAnswerTime) < 1000) {
        continue;
      }
      userWord.drill_last = new Date(latestAnswerTime);

      promises.push(this.srsService.processDrillGroup(userWord, drillsGroup));
    }

    await Promise.all(promises);

    let countWords = Object.keys(drillsById).length;

    return {
      success: true,
      finishContent: {
        title: 'Good job!',
        text: `Done ${drills.length} drills and studied ${countWords} words.`,
        //'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut imperdiet tortor. Quisque molestie turpis vitae ante iaculis, a convallis ante porta. Nullam a viverra elit, non interdum sem. Pellentesque quis felis ullamcorper dolor sollicitudin lacinia. Aliquam ac lacinia diam, at viverra urna. Duis eleifend, nunc quis pharetra laoreet, enim ipsum faucibus dui, euismod efficitur metus ipsum in massa. Curabitur dictum, ante non lobortis iaculis, leo mauris cursus nisi, non condimentum nunc ligula in sapien.',
      },
    };
  }

  @UseGuards(JwtAuthGuard, PaidGuard)
  @Get('list')
  async getList(@Req() req: RequestWithUser, @Query('listId', new DefaultValuePipe(null)) listId?: number, @Query('moreNewWords', new DefaultValuePipe(0)) moreNewWords?: number) {
    const user = req.user;

    let generator = await this.moduleRef.create(DrillsGenerator);
    await generator.prepareForUser(user);
    return await generator.getList(listId, moreNewWords);
  }

  @UseGuards(JwtAuthGuard, PaidGuard)
  @Get('card')
  async getCard(@Req() req: RequestWithUser, @Query() query: any) {
    const user = req.user;

    let generator = await this.moduleRef.create(DrillsGenerator);
    await generator.prepareForUser(user);

    return await generator.getOne(query.id);
  }

  @UseGuards(JwtAuthGuard, PaidGuard)
  @Get('settings')
  @UseInterceptors(ClassSerializerInterceptor)
  async getDrillSettings(@Req() req: RequestWithUser) {
    const user = req.user;
    let generator = await this.moduleRef.create(DrillsGenerator);
    await generator.prepareForUser(user);
    const settings = generator.getSettings();
    return { settings };
  }

  @UseGuards(JwtAuthGuard, PaidGuard)
  @Patch('settings')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async updateDrillSettings(@Req() req: RequestWithUser, @Body() body: UpdateDrillSettingsBodyDto) {
    const user = req.user;

    let generator = await this.moduleRef.create(DrillsGenerator);
    await generator.prepareForUser(user);
    await generator.updateSettings(body.settings);
    const settings = generator.getSettings();
    const result: { settings: DrillSettings; drills?: Drill[] } = { settings };
    if (body.drills) {
      result.drills = await generator.filterDrillsBySettings(body.drills);
    }

    return result;
  }

  @UseGuards(JwtAuthGuard, PaidGuard)
  @Post('hide')
  @UseInterceptors(ClassSerializerInterceptor)
  async hideDrills(@Req() req: RequestWithUser, @Body() body: DrillsHideDto) {
    const user = req.user;
    
    let generator = await this.moduleRef.create(DrillsGenerator);
    await generator.prepareForUser(user);

    await generator.applyHideSettings(body.drills, body.mode, body?.cardToHide);
    const drills = await generator.filterDrillsBySettings(body.drills);
    const settings = generator.getSettings();

    return {
      settings,
      drills,
    };
  }
}

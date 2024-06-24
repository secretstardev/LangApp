import { ActivityDetails } from './activity-details.model';

export interface Activity {
  date: string;
  total_seconds: number;
  goal_seconds: number;
  currency: string;
  details: ActivityDetails;
  penalty_amount: 0;
  is_goal_reached: false;
  is_penalty_received: false;
  is_current_day: true;
}

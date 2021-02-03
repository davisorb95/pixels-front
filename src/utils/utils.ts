import {Donor} from '../models/Donor';
import * as moment from 'moment';

export const compareContributes = (a: Donor, b: Donor): number => {
  return a.contribute > b.contribute ? -1 : b.contribute > a.contribute ? 1 : 0;
};

export const compareDates = (a: Donor, b: Donor) => {
  return moment(a.created).isAfter(moment(b.created)) ? -1 : moment(b.created).isAfter(moment(a.created)) ? 1 : 0;
};


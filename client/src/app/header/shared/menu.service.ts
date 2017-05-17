import { Injectable } from '@angular/core';

import { Link } from "../../common/link";
import { NAVLINKS } from "./mock-navlinks";

@Injectable()
export class MenuService {
  getNavlinks(): Promise<Link[]> {
    return Promise.resolve(NAVLINKS);
  }
}

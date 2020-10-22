import './stylesheets/main';
import { App } from './app';

Object.assign(unsafeWindow, { $, App });

App.init();

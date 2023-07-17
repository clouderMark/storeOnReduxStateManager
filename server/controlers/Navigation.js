import AppError from '../errors/AppError.js';
import NavigationModel from '../models/Navigation.js'

class Navigation {
  async getAll(req, res, next) {
    try {
      const breadcrumbs = await NavigationModel.getAll();
      res.json(breadcrumbs);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Navigation();

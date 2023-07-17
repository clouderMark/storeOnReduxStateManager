import {
  Industry as IndustryMapping,
  Solution as SolutionMapping,
  SubIndustry as SubIndustryMapping,
} from './mapping.js';

const attributes = {
  attributes: ['name', 'id'],
};

class Navigation {
  async getAll() {
    const industries = await IndustryMapping.findAll(attributes);
    const subIndustries = await SubIndustryMapping.findAll(attributes);
    const solutions = await SolutionMapping.findAll(attributes);

    return {industries, subIndustries, solutions};
  }
}

export default new Navigation();

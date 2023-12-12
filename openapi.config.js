module.exports = {
  // Path to file with api (*.json, *.yaml, url)
  file: './mock/a.json', // string

  // Api in json (if not use option 'file', more important than path to file)
  // apiJson: { ... },

  // Auth token for get api by url (it is header for request)
  authorization: 'Token 123qwerty', // string

  // Path output directory js api with types
  outputDir: './api', // string (default: "./api")

  // Mode for additional info
  mode: 'prod', // "prod" | "dev" (default: "prod")

  // Action for deprecated methods
  deprecated: 'warning', // "warning" | "ignore" | "exception" (default: "warning")

  // Import request code in out code
  // true — add import from `openapi/request`
  // false — embed request to `outputDir` and import from it
  // "disabled" — completely disable imporing `request`, use `templateCodeBefore`
  importRequest: true, // (default: false)

  // Build with original request body
  originalBody: true, // (default: false)

  // Ignore description of requests
  ignoreDescription: true, // default: false

  // Completely disable generating types file (.d.ts)
  disableTypesGenerate: true, // (default: false)

  /**
   * Change file name for source code
   * Also it can be a function
   * @example
   * templateFileNameCode: ({ swaggerData, changeCase }) => string,
   */
  templateFileNameCode: 'my-api.js', // (default: 'index.js')

  /**
   * Change file name for typing
   * Also it can be a function
   * @example
   * templateFileNameTypes: ({ swaggerData, changeCase }) => string,
   */
  templateFileNameTypes: 'my-api.d.ts', // (default: 'index.d.js')

  /**
   * Load presets and merge local properties to it
   * If preset created as a function, options can be passed
   * @example
   * presets: [
   *  ['my-super-openapi-preset', { passed: 'options' }],
   *  ['another-openapi-preset', { beautiful: 'options' }],
   * ]
   * If no options passed or used simple form, empty object passed to functional preset
   */
  // presets: ['my-super-openapi-preset'], // (default: [])

  /**
   * Template before main block code
   * @param {{
   *  swaggerData: { info: object; paths: object; components: object; };
   *  changeCase: { paramCase: Function; camelCase: Function; pascalCase: Function; ... };
   * }} extra
   */
  templateCodeBefore: extra => '',

  /**
   * Template request code
   * @param {{
   *  name: string;
   *  method: string;
   *  url: string;
   *  isWarningDeprecated: boolean;
   *  isExistParams: boolean;
   *  defaultParams: object;
   * }} params
   * @param {{
   *  swaggerData: { info: object; paths: object; components: object; };
   *  requestSwaggerData: { operationId: string; requestBody?: object; responses: object };
   *  changeCase: { paramCase: Function; camelCase: Function; pascalCase: Function; ... };
   * }} extra
   */
  templateRequestCode: (params, extra) => '',

  /**
   * Template after maon block code
   * @param {{
   *  swaggerData: { info: object; paths: object; components: object; };
   *  changeCase: { paramCase: Function; camelCase: Function; pascalCase: Function; ... };
   * }} extra
   */
  templateCodeAfter: extra => '',

  /**
   * Template before main block types
   * @param {{
   *  swaggerData: { info: object; paths: object; components: object; };
   *  changeCase: { paramCase: Function; camelCase: Function; pascalCase: Function; ... };
   * }} extra
   */
  templateTypesBefore: extra => '',

  /**
   * Template request types
   * @param {{
   *  name: string;
   *  summary: string;
   *  description: string;
   *  countVariants: number;
   *  index: number;
   *  params: SwaggerData | null;
   *  addedParams: SwaggerData | null;
   *  result: SwaggerData | null;
   * }} params
   * * @param {{
   *  swaggerData: { info: object; paths: object; components: object; };
   *  requestSwaggerData: { operationId: string; requestBody?: object; responses: object };
   *  changeCase: { paramCase: Function; camelCase: Function; pascalCase: Function; ... };
   * }} extra
   *
   * @type {https://swagger.io/docs/specification/data-models/} SwaggerData
   */
  templateRequestTypes: (param, extra) => '',

  /**
   * Template after main block types
   * @param {{
   *  swaggerData: { info: object; paths: object; components: object; };
   *  changeCase: { paramCase: Function; camelCase: Function; pascalCase: Function; ... };
   * }} extra
   */
  templateTypesAfter: extra => ''
}

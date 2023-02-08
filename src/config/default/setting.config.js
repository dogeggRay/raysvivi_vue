const setting = {
  //baseURL指定为根目录下.env(.xxx)下的配置
  //运行/打包命令使用指定配置：npm run [serve/build]:[dev/prod],如npm run build:dev
  baseURL: process.env.VUE_APP_BASE_URL,
}
module.exports = setting
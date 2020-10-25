import { BASEURL } from "./url";

const fetch = ({
  url,
  method = "GET",
  data,
  header = {},
  tips = "正在加载中...",
  isNeedAuth = true,
}) => {
  return new Promise((resolve, reject) => {
    // 对token进行处理
    if (isNeedAuth) {
      const my_token = uni.getStorageSync("my_token");
      if (my_token) {
        header.Authorization = my_token;
      }
    }

    uni.showLoading({
      title: tips,
    });

    // 异步请求
    uni.request({
      url: `${BASEURL}${url}`,
      method,
      data,
      header,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  });
};

export { fetch };

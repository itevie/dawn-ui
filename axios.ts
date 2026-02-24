import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { showLoadingAlert, showErrorAlert } from "./components/AlertManager";
import { HTTPMethod } from "./util";

export const client = axios.create({
  baseURL: window.location.host === "localhost" ? "http://localhost:3000" : "",
});

type CombinedConfig = AxiosRequestConfig & {
  showLoader?: boolean;
};

export class AxiosWrapper {
  public config: AxiosRequestConfig = {};
  public showLoader: boolean = false;
  public noReject: boolean = false;
  public noErrorMessage: boolean = false;

  public get<D extends any = any>(
    url: string,
    config?: CombinedConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"get", D>("get", url, undefined, config);
  }

  public delete<D extends any = any>(
    url: string,
    config?: CombinedConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"delete", D>("delete", url, undefined, config);
  }

  public post<D extends any = any>(
    url: string,
    data: any,
    config?: CombinedConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"post", D>("post", url, data, config);
  }

  public patch<D extends any = any>(
    url: string,
    data: any,
    config?: CombinedConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"patch", D>("patch", url, data, config);
  }

  public put<D extends any = any>(
    url: string,
    data: any,
    config?: CombinedConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"put", D>("put", url, data, config);
  }

  public wrapper<T extends HTTPMethod, D extends any = any>(
    method: T,
    url: string,
    data?: T extends "get" ? never | undefined : any,
    config?: CombinedConfig,
  ): Promise<AxiosResponse<D>> {
    return new Promise<AxiosResponse<D>>((resolve, reject) => {
      let loader: ReturnType<typeof showLoadingAlert> | null = null;
      if (this.showLoader || config?.showLoader) loader = showLoadingAlert();

      const sendingConfig: AxiosRequestConfig = {
        ...this.config,
        ...config,
        onUploadProgress: (ev) => loader?.progress(ev.progress || 0),
      };

      axios({
        method,
        url,
        data: data,
        ...sendingConfig,
      })
        .then((r) => {
          if (!r.status.toString().startsWith("2")) {
            console.error(`HTTP Errpr: Fetch ${method} ${url}`, r);
            if (!this.noErrorMessage)
              showErrorAlert(makeErrorResponseMessage(r));
            if (!this.noReject) reject(r);
          } else resolve(r);
        })
        .catch((r) => {
          console.error(`HTTP Errpr: Fetch ${method} ${url}`, r);
          if (!this.noErrorMessage)
            showErrorAlert(makeErrorResponseMessage(r.response));
          if (!this.noReject) reject(r);
        })
        .finally(() => {
          loader?.stop();
        });
    });
  }
}

export function axiosWrapper<
  T extends "get" | "post" | "patch",
  D extends any = any,
>(
  method: T,
  ...args: Parameters<(typeof axios)[T]>
): Promise<AxiosResponse<D>> {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const loader = showLoadingAlert();

    const data: AxiosRequestConfig = {
      ...(args[2] || {}),
      onUploadProgress: (ev) => loader.progress(ev.progress || 0),
    };
    args[2] = data;

    // @ts-ignore
    client[method](...args)
      .then((r) => {
        if (!r.status.toString().startsWith("2")) {
          showErrorAlert(makeErrorResponseMessage(r));
          reject();
        } else resolve(r);
      })
      .catch((r) => {
        showErrorAlert(makeErrorResponseMessage(r.response));
        reject();
      })
      .finally(() => {
        loader.stop();
      });
  });
}

export function makeErrorResponseMessage(response: AxiosResponse): string {
  let serverMessage = response?.data?.message;

  if (!serverMessage) {
    serverMessage =
      {
        404: "The resource does not exist",
      }[response?.status] || `Failed to fetch data`;
  }

  return `${serverMessage} (${response?.status} - ${response?.config?.url})`;
}

import { PluginErrorType, createErrorResponse } from '@lobehub/chat-plugin-sdk';
import axios from 'axios';

import { ImgReqData, ImgRespData, ImgStatusRespData } from '@/type';

export const config = {
  runtime: 'edge',
};

async function postImagePrompt(req: ImgReqData, apiKey: string) {
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-DashScope-Async': 'enable',
  };

  try {
    console.log('req', req);
    console.log('apiKey', apiKey);
    const res = await axios.post(
      `${process.env.ALI_BASE_URL}/services/aigc/text2image/image-synthesis`,
      req,
      { headers },
    );
    const { request_id, output } = res.data as ImgRespData;
    // 直接从这里返回request_id和output
    return { output, request_id };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async (req: Request) => {
  if (req.method !== 'POST') return createErrorResponse(PluginErrorType.MethodNotAllowed);

  const reqData = (await req.json()) as ImgReqData;

  // let settings = getPluginSettingsFromRequest<Settings>(req);
  // if (!settings)
  //     return createErrorResponse(PluginErrorType.PluginSettingsInvalid, {
  //     message: 'Plugin settings not found.',
  //     });
  const settings = {
    DASHSCOPE_API_KEY: process.env.DASHSCOPE_API_KEY as string,
  };

  // 1. 使用reqData 请求万相API

  const { output } = await postImagePrompt(reqData, settings.DASHSCOPE_API_KEY);

  console.log('output', output);

  // 2. 循环检查是否生成结束
  if (output && output.task_status === 'PENDING') {
    let status = 'RUNNING';
    let result;
    while (status !== 'SUCCEEDED' && status !== 'FAILED' && status !== 'UNKNOWN') {
      const url = `${process.env.ALI_BASE_URL}/tasks/${output.task_id}`;
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${settings.DASHSCOPE_API_KEY}`,
        },
      });
      const resp = response.data as ImgStatusRespData;
      status = resp.output.task_status;
      result = resp.output;
    }
    // 3. 组装响应结果并返回响应
    console.log('result', result);
    if (status === 'FAILED') {
      return createErrorResponse(PluginErrorType.InternalServerError, {
        message: result?.message || 'Failed to generate image.',
      });
    }
    if (status === 'UNKNOWN') {
      return createErrorResponse(PluginErrorType.InternalServerError, {
        message: result?.message || 'Unknown error occurred.',
      });
    }
    const target = result?.results;
    console.log();
    if (target)
      return new Response(
        JSON.stringify({
          imgUrl: target[0].url,
        }),
      );
  }
  return new Response(JSON.stringify(reqData));
};

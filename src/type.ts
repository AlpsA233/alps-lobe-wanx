export interface ClothesItem {
  description: string;
  name: string;
}
type Mood = 'happy' | 'sad' | 'anger' | 'fear' | 'surprise' | 'disgust';

export interface ResponseData {
  clothes: ClothesItem[];
  mood: Mood;
  today: number;
}

export interface RequestData {
  gender: 'man' | 'woman';
  mood: Mood;
}

export interface Settings {
  DASHSCOPE_API_KEY: string;
}

export interface ImgReqData {
  input: {
    negative_prompt?: string;
    prompt: string;
  };
  model: 'wanx-v1';
  parameters: {
    size: 1;
  };
}

export interface ImgRespData {
  output: {
    task_id: string;
    task_status: string;
  };
  request_id: string;
}

export interface ImgResultData {
  code?: string;
  message?: string;
  url?: string;
}

export interface ImgStatusRespData {
  output: {
    code?: string;
    message?: string;
    results?: ImgResultData[];
    task_id: string;
    task_metrics: {
      FAILED: number;
      SUCCEEDED: number;
      TOTAL: number;
    };
    task_status: 'SUCCEEDED' | 'FAILED' | 'RUNNING';
  };
  request_id: string;
}

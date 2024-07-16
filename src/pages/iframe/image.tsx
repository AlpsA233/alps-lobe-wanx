import { lobeChat } from '@lobehub/chat-plugin-sdk/client';
import { Image } from '@lobehub/ui';
import { memo, useEffect } from 'react';
import { Center } from 'react-layout-kit';
import { useSelector } from 'react-redux';


const Render = memo(() => {
  const imageUrl = useSelector((state: any) => state.image.imageUrl);
  // 初始化渲染状态

  // 初始化时从主应用同步状态

  // 记录请求参数

  useEffect(() => {
    lobeChat.getPluginPayload().then(() => {
      //   if (payload.name === 'recommendClothes') {
      //     setPayload(payload.arguments);
      //   }
    });
  }, []);

  return (
    <Center>
      {/* <Image 
  style={{ width: '200px', height: '200px' }}
  src={`https://dashscope-result-sh.oss-cn-shanghai.aliyuncs.com/1d/c2/20240715/1b61f1c0/0257cac9-a667-43c4-8f8c-b6a4afb9eeb2-1.png?Expires=1721123700&OSSAccessKeyId=LTAI5tQZd8AEcZX6KZV4G8qL&Signature=ef7BubkEkaV5PUIIuEiHI6iOzBk%3D`} /> */}
      <Image src={imageUrl} style={{ height: '200px', width: '200px' }} />
    </Center>
  );
});

export default Render;

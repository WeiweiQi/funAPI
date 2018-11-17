package com.tencent.ai.facerace;

public class UrlMethodUtil {
    public static byte[] local2byte(String url)throws Exception{  //由本地路径得到byte
        byte [] imageData = FileUtil.readFileByBytes(url);
        return imageData;
    }
    public static byte[] url2byte(String url)throws Exception {  //由url得到byte
        byte [] imageData =  IoUtil.getImageFromNetByUrl(url);
        return imageData;
    }
}

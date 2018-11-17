package com.tencent.ai.facerace;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

import org.eclipse.jetty.util.UrlEncoded;

import com.jfinal.kit.HttpKit;

public class FaceRace {
	
	public static final String APPID = "";
	public static final String APPKEY = "";
	public static final String BASEURL = "";
	
	public static void main(String[] args) throws Exception {
		byte [] imageData = 
				//UrlMethodUtil.url2byte("http://img.hb.aicdn.com/a6380ffab029bc42836ccebf729cfdb08d31e8aedfb0-yn2sFC_fw658");
				UrlMethodUtil.local2byte("D:\\qiweiwei\\java\\java_workspace\\funapi\\timg.jpg");
				//UrlMethodUtil.url2byte("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542391235021&di=a2c877dc74c900bedd011a409a242158&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd31b0ef41bd5ad6e018ba1228bcb39dbb7fd3c8c.jpg");
		Map<String, String> queryParas = new HashMap();
		queryParas.put("app_id", FaceConstant.FACE_APPID);
		queryParas.put("time_stamp", new Date().getTime()/1000 + "");
		queryParas.put("nonce_str", UUID.randomUUID().toString().trim().replaceAll("-", ""));
		queryParas.put("image", Base64Util.encode(imageData));
		queryParas.put("mode", "1");
		queryParas.put("sign", TencentAISignSort.getSignature(queryParas));
		Map<String, String> headers = new HashMap<>();
		headers.put("Content-Type", "application/x-www-form-urlencoded");
		
		
		//System.out.println(queryParas);
		
		StringBuilder data = new StringBuilder();
		Map<String, String> sortedParams = new TreeMap<>(queryParas);
		for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
			data.append(entry.getKey()).append("=").append(UrlEncoded.encodeString(entry.getValue())).append("&");
		}
		
//		HttpPost httpPost = new HttpPost();
//		URI aUrl = new URI(FaceConstant.FACE_BASEURL);
//		httpPost.setURI(aUrl);
//		
//		httpPost.started();
		String dataString = data.deleteCharAt(data.length()-1).toString();
		System.out.println(dataString);
		//String urlEncode = UrlEncoded.encodeString(dataString, Charset.forName("UTF-8"));
		//System.out.println(urlEncode);
		String response = HttpKit.post(FaceConstant.FACE_BASEURL, null, dataString, headers);//.post(FaceConstant.FACE_BASEURL, null, dataString, headers);
		//String response = HttpUtil.sendPost(FaceConstant.FACE_BASEURL, dataString);
		System.out.println(response);
		
		
	}
	
	public static String getPicResult() throws Exception {
		byte [] imageData = 
				//UrlMethodUtil.url2byte("http://img.hb.aicdn.com/a6380ffab029bc42836ccebf729cfdb08d31e8aedfb0-yn2sFC_fw658");
				UrlMethodUtil.local2byte("D:\\qiweiwei\\java\\java_workspace\\funapi\\timg.jpg");
				//UrlMethodUtil.url2byte("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542391235021&di=a2c877dc74c900bedd011a409a242158&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd31b0ef41bd5ad6e018ba1228bcb39dbb7fd3c8c.jpg");
		
		System.out.println("1");
		Map<String, String> queryParas = new HashMap();
		queryParas.put("app_id", FaceConstant.FACE_APPID);
		queryParas.put("time_stamp", new Date().getTime()/1000 + "");
		//queryParas.put("nonce_str", UUID.randomUUID().toString().trim().replaceAll("-", ""));
		queryParas.put("nonce_str", "abcdefghdd");
		queryParas.put("image", Base64Util.encode(imageData));
		queryParas.put("mode", "1");
		queryParas.put("sign", TencentAISignSort.getSignature(queryParas));
		Map<String, String> headers = new HashMap<>();
		headers.put("Content-Type", "application/x-www-form-urlencoded");
		
		//System.out.println(queryParas);
		
		StringBuilder data = new StringBuilder();
		for (Map.Entry<String, String> entry : queryParas.entrySet()) {
			data.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
		}
		
//		HttpPost httpPost = new HttpPost();
//		URI aUrl = new URI(FaceConstant.FACE_BASEURL);
//		httpPost.setURI(aUrl);
//		
//		httpPost.started();
		String dataString = data.deleteCharAt(data.length()-1).toString();
		System.out.println("init:" + dataString);
		//String urlEncode = UrlEncoded.encodeString(dataString, Charset.forName("UTF-8"));
		//System.out.println("url-endcode" + urlEncode);
		String response = HttpKit.post(FaceConstant.FACE_BASEURL, null, dataString);//.post(FaceConstant.FACE_BASEURL, null, dataString, headers);
		//String response = HttpUtil.sendPost(FaceConstant.FACE_BASEURL, dataString);
		return (response);
	}
	
	

}

package com.pic.compare;

import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;

public class PictureCompareController extends Controller{
	
	public void index() {
//		render("upLoadPicFile.html");
		render("uploadPicH5.html");
	}
	
	public void uploadFile() {
		System.out.println("ok");
		UploadFile file = getFile();
		System.out.println("file path : "+file.getUploadPath());
		renderText("1");
	}
	
	public void getPic() {
		System.out.println("getpic");
		UploadFile file = getFile();
//		render("upLoadPicFile.html");
//		renderText("1");
		renderJson("{\"error\":\"success\"}");
	}
}

package com.demo.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;
import com.jfinal.kit.StrKit;

public class MyPathHandler extends Handler {
	
	private String contextPathName;
	
	public MyPathHandler() {
		contextPathName = "CONTEXT_PATH";
	}
	
	public MyPathHandler(String contextPathName) {
		if (StrKit.isBlank(contextPathName)) {
			throw new IllegalArgumentException("contextPathName can not be blank.");
		}
		this.contextPathName = contextPathName;
	}
	
	@Override
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
		request.setAttribute(contextPathName, "/jfinalAPI");
		next.handle(target, request, response, isHandled);
	}
}
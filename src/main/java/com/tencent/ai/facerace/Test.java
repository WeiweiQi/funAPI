package com.tencent.ai.facerace;

import java.util.UUID;

public class Test {
	public static void main(String[] args) {
		String randomString = UUID.randomUUID().toString().trim().replaceAll("-", "");
		System.out.println(randomString);
		System.out.println("fec8a1e9e39c7850397c497a73d164b3".toUpperCase());
	}
}

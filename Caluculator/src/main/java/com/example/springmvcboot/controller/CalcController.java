package com.example.springmvcboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springmvcboot.Model.Calculate;

@RestController
public class CalcController {
	
	@CrossOrigin(origins = "http://localhost:5173") // Allow frontend origin
	@PostMapping("/calculate")
	public float cal(@RequestBody Calculate cal) {
		char ch=cal.getOperator().charAt(0);
		System.out.print("requested");
		switch(ch) {
		case '+':
			System.out.print(ch);
			return cal.getNum1()+cal.getNum2();			
		case '-':
			return cal.getNum1()-cal.getNum2();
		case '*':
			return cal.getNum1()*cal.getNum2();
		case '/':
			return cal.getNum1()/cal.getNum2();
		}
			
		return 0;
	}
}

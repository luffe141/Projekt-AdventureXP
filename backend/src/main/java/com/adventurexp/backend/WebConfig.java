package com.adventurexp.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
				.allowedOrigins("http://localhost:5173", "https://adventurexp-dyg7gcfbbackhphq.spaincentral-01.azurewebsites.net")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*");
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
		registry.addViewController("/admin").setViewName("forward:/index.html");
		registry.addViewController("/admin/").setViewName("forward:/index.html");
		registry.addViewController("/admin/{path:[^\\.]+}").setViewName("forward:/index.html");
		registry.addViewController("/{path:[^\\.]+}").setViewName("forward:/index.html");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**")
				.addResourceLocations("classpath:/static/");
	}

}

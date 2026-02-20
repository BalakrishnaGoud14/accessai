package com.accessai.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private static final Logger logger = LoggerFactory.getLogger(AiService.class);

    private final ChatClient chatClient;

    public AiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateDescription(String prompt) {
        try {
            logger.debug("Generating AI description for prompt: {}",
                    prompt.substring(0, Math.min(prompt.length(), 50)) + "...");
            String response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
            logger.debug("AI response received");
            return response;
        } catch (Exception e) {
            logger.error("Error generating AI description: {}", e.getMessage());
            // Fallback to avoid 500 error
            return "AI Description unavailable at this time. (Check API Key)";
        }
    }

    public String generateRoleDescription(String roleName) {
        logger.info("Generating role description for: {}", roleName);
        String prompt = "Provide a concise, professional description for the job role: " + roleName
                + ". Keep it under 50 words.";
        return generateDescription(prompt);
    }

    public AnalysisResult analyzeAccessRequest(String userName, String userRole, String department, String application,
            String justification) {
        logger.info("Analyzing access request for user: {}, App: {}", userName, application);
        String prompt = String.format(
                "Analyze the following access request and provide a risk assessment:\n" +
                        "User: %s (Role: %s, Department: %s)\n" +
                        "Application: %s\n" +
                        "Justification: %s\n\n" +
                        "Respond in the following format:\n" +
                        "Risk Level: [Low/Medium/High]\n" +
                        "Explanation: [A concise explanation and suggestion for the manager, around 50 words.]",
                userName, userRole, department, application, justification);

        String response = generateDescription(prompt);

        String riskLevel = "Medium"; // Default
        if (response.contains("Risk Level: Low"))
            riskLevel = "Low";
        else if (response.contains("Risk Level: High"))
            riskLevel = "High";
        else if (response.contains("Risk Level: Medium"))
            riskLevel = "Medium";

        String explanation = response.contains("Explanation:")
                ? response.substring(response.indexOf("Explanation:") + 12).trim()
                : response;

        logger.info("Analysis complete. Risk: {}", riskLevel);

        return new AnalysisResult(riskLevel, explanation);
    }

    public record AnalysisResult(String riskLevel, String explanation) {
    }
}

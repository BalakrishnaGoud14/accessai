package com.accessai.backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final ChatClient chatClient;

    public AiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateDescription(String prompt) {
        try {
            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            System.err.println("Error generating description: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public String generateRoleDescription(String roleName) {
        String prompt = "Provide a concise, professional description for the job role: " + roleName
                + ". Keep it under 50 words.";
        return generateDescription(prompt);
    }
}

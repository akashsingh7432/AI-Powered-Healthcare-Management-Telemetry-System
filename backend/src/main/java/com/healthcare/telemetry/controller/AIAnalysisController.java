package com.healthcare.telemetry.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIAnalysisController {

    public static class SymptomRequest {
        private String notes;

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }

    @PostMapping("/analyze-symptoms")
    public ResponseEntity<Map<String, Object>> analyzeSymptoms(@RequestBody SymptomRequest request) {
        // Mocking an AI response to simulate OpenAI or local ML model integration
        Map<String, Object> response = new HashMap<>();
        
        response.put("originalNotes", request.getNotes());
        response.put("analysisStatus", "SUCCESS");
        
        Map<String, Object> insights = new HashMap<>();
        insights.put("detectedSymptoms", new String[]{"elevated heart rate", "fatigue"});
        insights.put("severityLevel", "MODERATE");
        insights.put("recommendedAction", "Schedule follow-up cardiovascular screening.");
        
        response.put("summary", insights);

        return ResponseEntity.ok(response);
    }
}

## Example prompts (concrete)

### Relevance prompt (skeleton)

```
System: You are a complaint classifier.
Input:
- Complaint: {complaint_text}
- Context docs: {doc1_snippet} ... {docK_snippet}
Task: Decide whether this complaint is within company scope.
Output (JSON): {"decision":"Yes|No|Uncertain","score":0.0-1.0,"category":"billing|network|product|...","explanation":"1-2 sentences"}
```

```
You are an AI complaint filter. Given the complaint and company scope,
decide if the complaint is relevant.

Complaint: "My iPhone won’t charge."
Scope: "We provide mobile data and SIM card services. We do not handle device repairs."
Is the complaint relevant? Answer with Yes/No and explain.
```


### Resolution validation prompt (skeleton)

```
You are a resolution validator. Evaluate the department's resolution using 0-5 for:
1. Relevance
2. Completeness
3. PolicyCompliance
4. Clarity
5. Actionability

Inputs:
- Complaint: {complaint_text}
- Resolution: {resolution_text}
- Policies: {policy_snippets}

Output (JSON):
{
 "scores": {"relevance":x,"completeness":x,"compliance":x,"clarity":x,"actionability":x},
 "average": y,
 "status": "Valid|Needs Review|Invalid",
 "short_feedback": "..."
}
```


```
You are an AI resolution validator.  
Input:  
- Complaint: {complaint_text}  
- Department Resolution: {resolution_text}  
- Company Policies: {retrieved_policies}  

Task:  
1. Check if the resolution addresses all issues raised in the complaint.  
2. Verify that the resolution complies with company policies.  
3. Identify any missing, incorrect, or unclear parts.  
4. Output: Validation status (Valid / Invalid / Needs Review) + short explanation.
```

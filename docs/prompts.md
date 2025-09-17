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

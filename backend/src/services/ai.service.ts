export async function generateTestScript(domPayload: any) {
  console.log(`🧠 Sending DOM payload to Python AI Agent for analysis...`);

  try {
    const response = await fetch('http://localhost:8000/api/reason', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(domPayload),
    });

    if (!response.ok) {
      throw new Error(`AI Agent responded with status: ${response.status}`);
    }

    const aiData = await response.json();
    console.log(`✅ AI Agent successfully generated the test script!`);

    return aiData;
  } catch (error) {
    console.error('❌ Failed to communicate with Python AI Agent:', error);
    throw error; // Re-throw the error so our Controller can handle it
  }
}

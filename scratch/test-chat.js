import fetch from 'node-fetch';

async function testChat(question) {
  console.log(`\n==================================================`);
  console.log(`Testing Question: "${question}"`);
  console.log(`==================================================`);
  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: question }]
      })
    });

    const data = await res.json();
    console.log(`Source: ${data.source}`);
    if (data.note) console.log(`Note: ${data.note}`);
    if (data.errorNotice) console.log(`Error Notice: ${data.errorNotice}`);
    if (data.errorDetails) console.log(`Error Details: ${data.errorDetails}`);
    console.log(`\nReply:\n${data.reply}\n`);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

async function runAllTests() {
  await testChat("What are Ahtesham's strongest skills?");
  await testChat("What can Ahtesham build?");
  await testChat("Is Ahtesham a good Full Stack Developer candidate?");
  await testChat("Tell me about his AI experience.");
  await testChat("Is he an AI Engineer?");
  await testChat("Show me his best projects.");
  await testChat("Can I see his resume?");
  await testChat("How can I hire Ahtesham?");
}

runAllTests();

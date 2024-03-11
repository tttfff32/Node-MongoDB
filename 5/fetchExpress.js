

async function main() {
    const res = await fetch('http://localhost:8000/Worker');
  
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      
    }
  }
  
  main();

  async function main1() {
    const res = await fetch('http://localhost:8000/User');
  
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  }
  
  main1();
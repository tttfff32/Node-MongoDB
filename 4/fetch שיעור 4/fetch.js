async function main() {
  const res = await fetch('https://api.myip.com');

  if (res.ok) {
    const data = await res.json();
    console.log(data["ip"]);
  }
}

main();
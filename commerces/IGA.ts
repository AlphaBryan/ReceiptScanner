export function analyzeTicketIGA(ticketLinesArray: Array<Line>) {
  const analyze = {
    // ticketText: JSON.stringify(ticketLinesJSON, null, 4) as string,
    ticketText: JSON.stringify(ticketLinesArray, null, 4) as string,
    ticket: null as ticket | null,
  };
  const market: market = {
    name: "",
    address: "",
    phone: "",
    city: "",
  };
  const product1: product = {
    name: "Carotte",
    quantity: 2,
    price: 2.5,
  };
  const ticket: ticket = {
    market: market,
    client: {
      type: "5",
      numberClient: "N/A",
    },
    Products: [],
    total: 0,
  };
  const labelReduction = "RABAIS SUR LE PRIX COURANT";
  let listStartIndex: number | any = null;
  let listEndIndex: number | any = null;
  let numberOfProducts = 0;
  const IGNORED_LABELS = [
    "TOTAL",
    "VISA",
    "ARGENT",
    "SOUS-TOTAL",
    "ICH",
    "TPS",
    "TVQ",
    "TVO",
    "On",
    "BOUFFE",
    "Monnaie",
    "Média",
    "PRIX",
    "articles",
    "@",
    "x",
    "ECONOMIE",
  ];
  // console.log("ticketLinesJSON: ", ticketLinesJSON);
  // const ticketLinesArray = Object.values(ticketLinesJSON);

  ticketLinesArray.forEach((line: Line, index: number) => {
    // console.log("line: ", line);
    const articles = {};
    if (line.text === "IGA" && ticket.market.name == "") {
      ticket.market.name = line.text;
      ticket.market.address = ticketLinesArray[index + 1].text;
      ticket.market.phone = ticketLinesArray[index + 2].text;
      ticket.market.city = ticketLinesArray[index + 5].text;
      ticket.client.type = ticketLinesArray[index + 4].text;
    }

    if (line.text.includes("EPICERIE")) {
      listStartIndex = index;
    }
    if (line.text.includes("TOTAL")) {
      listEndIndex = index;
      ticket.total = Number(line.text.split("$")[1].trim());
    }
    if (index > listStartIndex && listStartIndex != null) {
      if (
        line.text.length > 10 && // Avoids lines with only numbers
        !line.text.includes(labelReduction) &&
        !IGNORED_LABELS.some((label) => line.text.includes(label))
      ) {
        let name = line.text;
        let price = -1;
        if (line.text.includes("$")) {
          name = line.text.split("$")[0].trim();
          price = Number(line.text.split("$")[1].trim());
        }
        const productObject: product = {
          name: name,
          quantity: 1,
          price: price,
        };
        const productIndex = ticket.Products.findIndex(
          (product) => product.name === name
        );
        if (productIndex !== -1) {
          ticket.Products[productIndex].quantity++;
        } else {
          ticket.Products.push(productObject);
        }
      }
    }
  });
  analyze.ticket = ticket;
  return analyze;
}

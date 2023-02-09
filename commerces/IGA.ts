export function analyzeTicketIGA(ticketText: string) {
  const analyze = {
    ticketText: ticketText as string,
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
  const ticketTextArray = ticketText.split("\n");
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
    'TVO',
    "On",
    "BOUFFE",
    "Monnaie",
    "Média",
    "PRIX",
    "articles",
  ];
  ticketTextArray.forEach((element, index) => {
    const articles = {};
    if (element === "IGA" && ticket.market.name == "") {
      ticket.market.name = element;
      ticket.market.address = ticketTextArray[index + 1];
      ticket.market.phone = ticketTextArray[index + 2];
      ticket.market.city = ticketTextArray[index + 5];
      ticket.client.type = ticketTextArray[index + 4];
      //   console.log("listStartIndex: ", listStartIndex);
    }

    if (element.includes("EPICERIE")) {
      listStartIndex = index;
      numberOfProducts = parseInt(ticketTextArray[ticketTextArray.length - 1]);
      listEndIndex = index + numberOfProducts;
    }
    if (
      index > listStartIndex &&
      listStartIndex != null
      //   && index < listEndIndex
    ) {
      if (
        !element.includes("$") &&
        // ticket.Products.length < numberOfProducts &&
        !element.includes(labelReduction) &&
        // element not include any of the ignored labels
        !IGNORED_LABELS.some((label) => element.includes(label)) &&
        ticketTextArray[ticketTextArray.length - 1] !== element
      ) {
        const productObject: product = {
          name: element,
          quantity: 1,
          price: -1,
        };

        // check if element name is already present in the products list and if so, increment the quantity else add it to the list
        const productIndex = ticket.Products.findIndex(
            (product) => product.name === element
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

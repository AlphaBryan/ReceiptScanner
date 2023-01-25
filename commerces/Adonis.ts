export function analyzeTicketAdonis(ticketText: string) {
  const analyze = {
    ticketText: ticketText as string,
    ticket: null as ticket | null,
  };
  const market: market = {
    name: "",
    address: "Rue de la République, 75011 Pariss",
    phone: "01 43 54 65 76",
    city: "Paris",
  };
  const product1: product = {
    name: "Carotte",
    quantity: 2,
    price: 2.5,
  };
  const ticket: ticket = {
    market: market,
    client: {
      type: "",
      numberClient: "",
    },
    Products: [],
    total: 0,
  };
  const ticketTextArray = ticketText.split("\n");
  //   ticketTextArray.unshift("ADONIS");
  let listStartIndex: number | any = null;
  let listEndIndex: number | any = null;
//   console.log("ticketTextArray: ", ticketTextArray);
  ticketTextArray.forEach((element, index) => {
    const articles = {};
    if (element.includes("ADONIS") && ticket.market.name === "") {
      if (ticketTextArray[index + 1].includes("ADONIS")) {
        return;
      }
      ticket.market.name = element;
      ticket.market.address = ticketTextArray[index + 1];
      ticket.market.city = ticketTextArray[index + 2];
      listStartIndex = index + 6;
    }
    if (
      listStartIndex !== null &&
      index >= listStartIndex &&
      listEndIndex === null
    ) {
      if (element.includes("TOTAL")) {
        listEndIndex = index;
        return;
      }
      if (
        !element.includes("ADONIS") &&
        !element.includes("Marché méditerranéen") &&
        !element.includes("POISS.FRAIS.")
      ) {
        // console.log("element: ", element);
        const productObject: product = {
          name: element,
          quantity: 1,
          price: -1,
        };
        ticket.Products.push(productObject);
      }
    }
    if (element.includes("TEL")) {
      ticket.client.type = element;
      ticket.market.phone = element.split(":")[1];
    }
    if (element.includes("ESCOMPTE")) {
      ticket.client.type = element;
    }
    if (element.includes("client")) {
      ticket.client.numberClient = element.split(":")[1];
    }
    if (element.includes("ÉCONOM")) {
      ticket.Products.forEach((product, order) => {
        product.price = parseFloat(ticketTextArray[index + order + 1]);
        ticket.total += product.price;
      });
    }
  });
//   console.log("ticket: ", ticket.Products);
  analyze.ticket = ticket;
  return analyze;
}

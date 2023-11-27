document.addEventListener("DOMContentLoaded", function () {
    fetch("Dados/dados.json")
        .then(response => response.json())
        .then(data => {
            const supermercados = data.supermercados;
            const produtos = Object.keys(supermercados[0].produtos);
            
            const datasets = supermercados.map(supermercado => ({
                label: supermercado.nome,
                data: produtos.map(produto => supermercado.produtos[produto]),
                backgroundColor: getRandomColor()
            }));

            const ctx = document.getElementById("myChart").getContext("2d");
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: produtos,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    legend: {
                        position: "top"
                    },
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true }
                    }
                }
            });
        });
});

function downloadChart() {
    const format = document.getElementById("format").value;
    const canvas = document.getElementById("myChart");

    if (format === "pdf") {
        const pdfDoc = pdfMake.createPdf({
            content: [
                {
                    image: canvas.toDataURL("image/png"),
                    width: 500,
                },
            ],
        });

        pdfDoc.download('jlk.pdf');
    } else {
        const quality = format === "jpeg" ? 1.0 : undefined;
        const url = canvas.toDataURL(`image/${format}`, quality);

        const link = document.createElement("a");
        link.href = url;
        link.download = `jlk.${format}`;
        
        link.click();
    }
}

function getRandomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

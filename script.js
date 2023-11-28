document.addEventListener('DOMContentLoaded', function () {
    fetch('Dados/dados.json')
        .then(response => response.json())
        .then(data => {
            const anos = data.map(item => item.ano);
            const salarios = data.map(item => item.Cesta);

            const ctx = document.getElementById('cestaChart').getContext('2d');
            const salarioChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: anos,
                    datasets: [{
                        label: 'Cesta Básica',
                        borderColor: 'rgb(75, 192, 192)',
                        data: salarios,
                        fill: false
                    }]
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
    const canvas = document.getElementById("cestaChart");

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


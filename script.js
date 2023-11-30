document.addEventListener('DOMContentLoaded', function () {
    fetch('Dados/dados.json')
        .then(response => response.json())
        .then(data => {
            const anos = data.map(item => item.ano);
            const salarios = data.map(item => item.salario);
            const cestas = data.map(item => item.Cesta);

            const ctx = document.getElementById('salarioCestaChart').getContext('2d');
            const salarioCestaChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: anos,
                    datasets: [
                        {
                            label: 'Salário',
                            borderColor: 'rgb(0,128,0)',
                            data: salarios,
                            fill: false
                        },
                        {
                            label: 'Cesta Básica',
                            borderColor: 'rgb(255,140,0)',
                            data: cestas,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        position: "top"
                    },
                    scales: {
                        x: { stacked: true },
                        x: { stacked: true }
                    }
                }
            });
        });
});
function downloadChart() {
    const format = document.getElementById("format").value;
    const canvas = document.getElementById("salarioCestaChart");

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

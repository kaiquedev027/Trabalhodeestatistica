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
                      },
                    plugins: {
                        legend: {
                            labels: {
                                fontColor: 'white' // Configuração da cor do texto da legenda
                            }
                        }
                    }
                }
            });

            // Defina a cor de fundo como branco no Chart.js
            salarioCestaChart.options.plugins.backgrounds.backgroundColor = 'white';
            
            // Atualize o gráfico para aplicar a cor de fundo
            salarioCestaChart.update();
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

    } else if (format === "xls" || format === "csv") {
        // Lógica para gerar o gráfico em XLS ou CSV

        // Criação de um elemento fictício para simular dados do gráfico
        const chartData = [
            ["ano", 2012, "salario", 622,"Cesta", 268.03],
            ["ano", 2013, "salario", 678,"Cesta", 301.20],
            ["ano", 2014, "salario", 724,"Cesta", 308.32],
            ["ano", 2015, "salario", 788,"Cesta", 388.47],
            ["ano", 2016, "salario", 880,"Cesta", 408.06],
            ["ano", 2017, "salario", 937,"Cesta", 366.26],
            ["ano", 2018, "salario", 954,"Cesta", 422.88],
            ["ano", 2019, "salario", 998,"Cesta", 450.08],
            ["ano", 2020, "salario", 1045,"Cesta", 576.48],
            ["ano", 2021, "salario", 1100,"Cesta", 641.37],
            ["ano", 2022, "salario", 1212,"Cesta", 744.21],
            ["ano", 2023, "salario", 1320,"Cesta", 682.97],
    
            // ... adicione seus dados de gráfico aqui
        ];

        // Converte os dados para o formato desejado
        let content;
        if (format === "xls") {
            const ws = XLSX.utils.aoa_to_sheet(chartData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Gráfico");
            content = XLSX.write(wb, { bookType: "xlsx", type: "blob" });
        } else if (format === "csv") {
            const csvContent = chartData.map(row => row.join(",")).join("\n");
            content = new Blob([csvContent], { type: "text/csv" });
        }

        // Cria um link para o download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `jlk.${format}`;

        // Dispara o clique no link
        link.click();

    } else {
        const quality = format === "jpeg" ? 1.0 : undefined;
        const url = canvas.toDataURL(`image/${format}`, quality);

        const link = document.createElement("a");
        link.href = url;
        link.download = `jlk.${format}`;

        link.click();
    }
}



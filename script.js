document.addEventListener('DOMContentLoaded', function () {
    fetch('Dados/dados.json')
        .then(response => response.json())
        .then(data => {
            const datas = data.map(item => item.Data);
            const aberturas = data.map(item => item.abertura);
            const medias = data.map(item => item.media);
            const medianas = data.map(item => item.mediana);
            const desvios = data.map(item => item.desvio);
        

            const ctx = document.getElementById('MagazineChart').getContext('2d');
            const magazineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels:datas,
                    datasets: [
                       
                        {
                            label: 'abertura',
                            borderColor: 'rgb(23, 98, 227)',
                            borderWidth: 1,
                            radius: 2,
                            data: aberturas,
                        

                        },
                        {
                            label: 'média',
                            borderColor: 'rgb(50, 168, 86)',
                            borderWidth: 1,
                            radius: 3,
                            data: medias,
                            
                        },
                        {
                            label: 'mediana',
                            borderColor: 'rgb(247, 62, 5)',
                            borderWidth: 1,
                            radius: 7,
                            data: medianas,
                        

                        },
                        {
                            label: 'desvio padrão',
                            borderColor: 'rgb(247, 5, 5)',
                            borderWidth: 1,
                            radius: 3,
                            data: desvios,
                        

                        }
                    ]
                },
                options: {
                    responsive: true,
                    Animation,
                    interaction:{
                        intersect:false
                    },
                    legend: {
                        position: "top"
                    },
                    scales: {
                        x: { stacked: true }
                    },
                    plugins: {
                        legend:{
                            labels: {
                                fontColor: 'white' // Configuração da cor do texto da legenda
                            }
                        }
                    }
                }
            });

            // Defina a cor de fundo como branco no Chart.js
            magazineChart.options.plugins.backgrounds.backgroundColor = 'white';
            
            // Atualize o gráfico para aplicar a cor de fundo
            magazineChart.update();
        });
});

function downloadChart() {
    const format = document.getElementById("format").value;
    const canvas = document.getElementById("MagazineChart");

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
            ["Data", 1, "abertura", 1.34,"desvio",0.28],
            ["Data", 3, "abertura", 1.36],
            ["Data", 7, "abertura", 1.43],
            ["Data", 8, "abertura", 1.77],
            ["Data", 9, "abertura", 1.81],
            ["Data", 10, "abertura", 1.73],
            ["Data", 13, "abertura", 1.8,"media",1.87],
            ["Data", 14, "abertura", 1.67],
            ["Data", 16, "abertura", 1.71],
            ["Data", 17, "abertura", 2.2],
            ["Data", 20, "abertura", 2.23],
            ["Data", 21, "abertura", 2.28],
            ["Data", 22, "abertura", 2.15],
            ["Data", 23, "abertura", 2.09],
            ["Data", 24, "abertura", 2.17],
            ["Data", 27, "abertura", 2.04],
            ["Data", 28, "abertura", 1.96],
            ["Data", 29, "abertura", 1.94],
            ["Data", 30, "abertura", 1.93,"mediana",1.93],
    
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
document.addEventListener('DOMContentLoaded', function () {
    fetch('Dados/dados02.json')
        .then(response => response.json())
        .then(data => {
            const datas = data.map(item => item.Data);
            const fechamentos = data.map(item => item.fechamento);
            const medias = data.map(item => item.media);
            const medianas = data.map(item => item.mediana);
            const desvios = data.map(item => item.desvio);
        
        

            const ctx = document.getElementById('MagazineCharts').getContext('2d');
            const magazineCharts = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: datas,
                    datasets: [
                        {
                            label: 'fechamento',
                            borderColor: 'rgb(23, 98, 227)',
                            borderWidth: 1,
                            radius: 3,
                            data: fechamentos,
                        },
                        {
                            label: 'média',
                            borderColor: 'rgb(50, 168, 86)',
                            borderWidth: 1,
                            radius: 7,
                            data: medias,
                            
                        },
                        {
                            label: 'mediana',
                            borderColor: 'rgb(247, 62, 5)',
                            borderWidth: 1,
                            radius: 7,
                            data: medianas,
                        

                        },
                        {
                            label: 'desvio padrão',
                            borderColor: 'rgb(247, 5, 5)',
                            borderWidth: 1,
                            radius: 2,
                            data: desvios,
                        

                        }
                    ]
                    
                },
                options: {
                    responsive: true,
                    Animation,
                    interaction:{
                        intersect:false
                    },
                    legend: {
                        position: "top"
                    },
                    scales: {
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
            magazineCharts.options.plugins.backgrounds.backgroundColor = 'white';
            
            // Atualize o gráfico para aplicar a cor de fundo
            magazineCharts.update();
        });
});

function downloadChart() {
    const format = document.getElementById("format").value;
    const canvas = document.getElementById("MagazineCharts");

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
            ["Data", 1, "fechamento", 1.33,"desvio",0.24],
            ["Data", 3, "fechamento", 1.48],
            ["Data", 7, "fechamento", 1.77],
            ["Data", 8, "fechamento", 1.8],
            ["Data", 9, "fechamento", 1.72],
            ["Data", 10, "fechamento", 1.77],
            ["Data", 13, "fechamento", 1.72],
            ["Data", 14, "fechamento", 1.78],
            ["Data", 16, "fechamento", 2.19],
            ["Data", 17, "fechamento", 2.2],
            ["Data", 20, "fechamento", 2.28],
            ["Data", 21, "fechamento", 2.15],
            ["Data", 22, "fechamento", 2.09],
            ["Data", 23, "fechamento", 2.17],
            ["Data", 24, "fechamento", 2],
            ["Data", 27, "fechamento", 1.98],
            ["Data", 28, "fechamento", 1.9,"media",1.90],
            ["Data", 29, "fechamento", 1.89,"mediana",1.9],
            ["Data", 30, "fechamento", 2.02],
    
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
function changeChart() {
    const selectedChart = document.getElementById("chartSelector").value;

    // Oculte todos os gráficos
    const allCharts = document.querySelectorAll('canvas');
    allCharts.forEach(chart => {
        chart.style.display = 'none';
    });

    // Mostre apenas o gráfico selecionado
    const selectedCanvas = document.getElementById(selectedChart);
    selectedCanvas.style.display = 'block';
}

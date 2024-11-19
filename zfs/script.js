document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('zfsForm');
    const elements = form.elements;

    function calculate() {
        const diskCount = parseInt(document.getElementById('diskCount').value);
        const diskSize = parseInt(document.getElementById('diskSize').value);
        const raidLevel = document.getElementById('raidLevel').value;
        const recordSize = parseInt(document.getElementById('recordSize').value);
        const sectorSize = parseInt(document.getElementById('sectorSize').value);

        const rawCapacity = diskCount * diskSize;
        let usableCapacity = 0;

        switch(raidLevel) {
            case 'stripe':
                usableCapacity = rawCapacity;
                break;
            case 'mirror':
                usableCapacity = diskSize;
                break;
            case 'raidz1':
                usableCapacity = (diskCount - 1) * diskSize;
                break;
            case 'raidz2':
                usableCapacity = (diskCount - 2) * diskSize;
                break;
            case 'raidz3':
                usableCapacity = (diskCount - 3) * diskSize;
                break;
        }

        const overheadFactor = 1 - (128 / recordSize) * 0.03;
        const sectorSizeFactor = 1 - (512 / sectorSize) * 0.01;
        usableCapacity *= overheadFactor * sectorSizeFactor;

        const rawCapacityTiB = rawCapacity * 0.9095;
        const usableCapacityTiB = usableCapacity * 0.9095;

        document.getElementById('rawCapacityTB').textContent = rawCapacity.toFixed(2);
        document.getElementById('rawCapacityTiB').textContent = rawCapacityTiB.toFixed(2);
        document.getElementById('usableCapacityTB').textContent = usableCapacity.toFixed(2);
        document.getElementById('usableCapacityTiB').textContent = usableCapacityTiB.toFixed(2);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calculate();
    });

    for (let element of elements) {
        element.addEventListener('change', calculate);
    }

    // Call calculate on page load
    calculate();
});
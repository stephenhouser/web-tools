document.getElementById('zfsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const diskCount = parseInt(document.getElementById('diskCount').value);
    const diskSize = parseFloat(document.getElementById('diskSize').value);
    const sectorSize = parseInt(document.getElementById('sectorSize').value);
    const recordSize = parseInt(document.getElementById('recordSize').value);
    const raidLevel = document.getElementById('raidLevel').value;
    
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
    
    document.getElementById('result').innerHTML = `
        <div class="alert alert-success">
            <p>Raw capacity: ${rawCapacity.toFixed(2)} TB (${rawCapacityTiB.toFixed(2)} TiB)</p>
            <p>Estimated usable capacity: ${usableCapacity.toFixed(2)} TB (${usableCapacityTiB.toFixed(2)} TiB)</p>
        </div>
    `;    
});
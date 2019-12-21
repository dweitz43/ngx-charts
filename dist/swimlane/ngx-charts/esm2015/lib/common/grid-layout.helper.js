import { scaleBand } from 'd3-scale';
export function gridSize(dims, len, minWidth) {
    let rows = 1;
    let cols = len;
    const width = dims.width;
    if (width > minWidth) {
        while (width / cols < minWidth) {
            rows += 1;
            cols = Math.ceil(len / rows);
        }
    }
    return [cols, rows];
}
export function gridLayout(dims, data, minWidth, designatedTotal) {
    const xScale = scaleBand();
    const yScale = scaleBand();
    const width = dims.width;
    const height = dims.height;
    const [columns, rows] = gridSize(dims, data.length, minWidth);
    const xDomain = [];
    const yDomain = [];
    for (let i = 0; i < rows; i++) {
        yDomain.push(i);
    }
    for (let i = 0; i < columns; i++) {
        xDomain.push(i);
    }
    xScale.domain(xDomain);
    yScale.domain(yDomain);
    xScale.rangeRound([0, width], 0.1);
    yScale.rangeRound([0, height], 0.1);
    const res = [];
    const total = designatedTotal ? designatedTotal : getTotal(data);
    const cardWidth = xScale.bandwidth();
    const cardHeight = yScale.bandwidth();
    for (let i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i] ? data[i].name : '',
            value: data[i] ? data[i].value : undefined,
            extra: data[i] ? data[i].extra : undefined,
            label: data[i] ? data[i].label : ''
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = total > 0 ? res[i].data.value / total : 0;
        res[i].data.total = total;
    }
    return res;
}
function getTotal(results) {
    return results.map(d => (d ? d.value : 0)).reduce((sum, val) => sum + val, 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1sYXlvdXQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2dyaWQtbGF5b3V0LmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXJDLE1BQU0sVUFBVSxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRO0lBQzFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNmLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFekIsSUFBSSxLQUFLLEdBQUcsUUFBUSxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxHQUFHLElBQUksR0FBRyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNWLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM5QjtLQUNGO0lBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlO0lBQzlELE1BQU0sTUFBTSxHQUFRLFNBQVMsRUFBVSxDQUFDO0lBQ3hDLE1BQU0sTUFBTSxHQUFRLFNBQVMsRUFBVSxDQUFDO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUUzQixNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUU5RCxNQUFNLE9BQU8sR0FBRyxF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QUM7QUFDYixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsT0FBTztJQUN2QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzY2FsZUJhbmQgfSBmcm9tICdkMy1zY2FsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBncmlkU2l6ZShkaW1zLCBsZW4sIG1pbldpZHRoKSB7XG4gIGxldCByb3dzID0gMTtcbiAgbGV0IGNvbHMgPSBsZW47XG4gIGNvbnN0IHdpZHRoID0gZGltcy53aWR0aDtcblxuICBpZiAod2lkdGggPiBtaW5XaWR0aCkge1xuICAgIHdoaWxlICh3aWR0aCAvIGNvbHMgPCBtaW5XaWR0aCkge1xuICAgICAgcm93cyArPSAxO1xuICAgICAgY29scyA9IE1hdGguY2VpbChsZW4gLyByb3dzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2NvbHMsIHJvd3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JpZExheW91dChkaW1zLCBkYXRhLCBtaW5XaWR0aCwgZGVzaWduYXRlZFRvdGFsKSB7XG4gIGNvbnN0IHhTY2FsZTogYW55ID0gc2NhbGVCYW5kPG51bWJlcj4oKTtcbiAgY29uc3QgeVNjYWxlOiBhbnkgPSBzY2FsZUJhbmQ8bnVtYmVyPigpO1xuICBjb25zdCB3aWR0aCA9IGRpbXMud2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IGRpbXMuaGVpZ2h0O1xuXG4gIGNvbnN0IFtjb2x1bW5zLCByb3dzXSA9IGdyaWRTaXplKGRpbXMsIGRhdGEubGVuZ3RoLCBtaW5XaWR0aCk7XG5cbiAgY29uc3QgeERvbWFpbiA9IFtdO1xuICBjb25zdCB5RG9tYWluID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgeURvbWFpbi5wdXNoKGkpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1uczsgaSsrKSB7XG4gICAgeERvbWFpbi5wdXNoKGkpO1xuICB9XG4gIHhTY2FsZS5kb21haW4oeERvbWFpbik7XG4gIHlTY2FsZS5kb21haW4oeURvbWFpbik7XG5cbiAgeFNjYWxlLnJhbmdlUm91bmQoWzAsIHdpZHRoXSwgMC4xKTtcbiAgeVNjYWxlLnJhbmdlUm91bmQoWzAsIGhlaWdodF0sIDAuMSk7XG5cbiAgY29uc3QgcmVzID0gW107XG4gIGNvbnN0IHRvdGFsID0gZGVzaWduYXRlZFRvdGFsID8gZGVzaWduYXRlZFRvdGFsIDogZ2V0VG90YWwoZGF0YSk7XG4gIGNvbnN0IGNhcmRXaWR0aCA9IHhTY2FsZS5iYW5kd2lkdGgoKTtcbiAgY29uc3QgY2FyZEhlaWdodCA9IHlTY2FsZS5iYW5kd2lkdGgoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICByZXNbaV0gPSB7fTtcbiAgICByZXNbaV0uZGF0YSA9IHtcbiAgICAgIG5hbWU6IGRhdGFbaV0gPyBkYXRhW2ldLm5hbWUgOiAnJyxcbiAgICAgIHZhbHVlOiBkYXRhW2ldID8gZGF0YVtpXS52YWx1ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV4dHJhOiBkYXRhW2ldID8gZGF0YVtpXS5leHRyYSA6IHVuZGVmaW5lZCxcbiAgICAgIGxhYmVsOiBkYXRhW2ldID8gZGF0YVtpXS5sYWJlbCA6ICcnXG4gICAgfTtcbiAgICByZXNbaV0ueCA9IHhTY2FsZShpICUgY29sdW1ucyk7XG4gICAgcmVzW2ldLnkgPSB5U2NhbGUoTWF0aC5mbG9vcihpIC8gY29sdW1ucykpO1xuICAgIHJlc1tpXS53aWR0aCA9IGNhcmRXaWR0aDtcbiAgICByZXNbaV0uaGVpZ2h0ID0gY2FyZEhlaWdodDtcbiAgICByZXNbaV0uZGF0YS5wZXJjZW50ID0gdG90YWwgPiAwID8gcmVzW2ldLmRhdGEudmFsdWUgLyB0b3RhbCA6IDA7XG4gICAgcmVzW2ldLmRhdGEudG90YWwgPSB0b3RhbDtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGdldFRvdGFsKHJlc3VsdHMpIHtcbiAgcmV0dXJuIHJlc3VsdHMubWFwKGQgPT4gKGQgPyBkLnZhbHVlIDogMCkpLnJlZHVjZSgoc3VtLCB2YWwpID0+IHN1bSArIHZhbCwgMCk7XG59XG4iXX0=
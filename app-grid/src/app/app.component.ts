import {Component} from '@angular/core';
import {GridOptions, GridReadyEvent, RowSelectedEvent} from "ag-grid-community";
import RefData from "./refData";
import {Action} from "rxjs/internal/scheduler/Action";
import {ActionRendererComponent} from "./renderers/action-renderer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: any[] | undefined;
  public rowCount: string | undefined;
  public columnDefs:any;
  constructor() {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;
  }

  private createRowData() {
    const rowData: any[] = [];
    for (let i = 0; i < 200; i++) {
      const countryData = RefData.countries[i % RefData.countries.length];
      rowData.push({
        name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
        skills: {
          android: Math.random() < 0.4,
          html5: Math.random() < 0.4,
          mac: Math.random() < 0.4,
          windows: Math.random() < 0.4,
          css: Math.random() < 0.4
        },
        dob: RefData.DOBs[i % RefData.DOBs.length],
        address: RefData.addresses[i % RefData.addresses.length],
        years: Math.round(Math.random() * 100),
        proficiency: Math.round(Math.random() * 100),
        country: countryData.country,
        continent: countryData.continent,
        language: countryData.language,
        mobile: createRandomPhoneNumber(),
        landline: createRandomPhoneNumber()
      });
    }

    this.rowData = rowData;
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '#',
        width: 30,
        checkboxSelection: true,
        suppressSorting: true,
        suppressMenu: true,
        pinned: 'left',
      },
      {
        headerName: 'Employee',
        children: [
          {
            headerName: "Name",
            field: "name",
            editable: false,
            filter: 'text',
            floatingFilter: true,
            columnGroupShow: 'close',
            width: 150,
            resizable: true,
          },
          {
            headerName: "Country",
            field: "country",
            width: 150,
            floatingFilter: true,
            filter: 'text',
            columnGroupShow: 'close',
            resizable: true,
          },
          {
            headerName: "DOB",
            field: "dob",
            width: 120,
            resizable: true,
            cellRenderer: function(params: any) {
              return  pad(params.value.getDate(), 2) + '/' +
                pad(params.value.getMonth() + 1, 2)+ '/' +
                params.value.getFullYear();
            },
            filter: 'date',
            columnGroupShow: 'close',
          }
        ]
      },
      {
        headerName: 'IT Skills',
        children: [
          {
            headerName: "Skills",
            field: "skill",
            width: 125,
            suppressSorting: true,
            floatingFilter: true,
            cellRenderer: skillsCellRenderer,
            filter: 'text',
          },
          {
            headerName: "Proficiency",
            field: "proficiency",
            width: 120,
            floatingFilter: true,
            cellRenderer: percentCellRenderer,
            filter: 'text',
          },
        ]
      },
      {
        headerName: 'Contact',
        children: [
          {
            headerName: "Mobile",
            field: "mobile",
            width: 150,
            floatingFilter: true,
            resizable: true,
            filter: 'text',
          },
          {
            headerName: "Land-line",
            field: "landline",
            width: 150,
            filter: 'text',
            floatingFilter: true,
            resizable: true,
          },
          {
            headerName: "Address",
            field: "address",
            width: 350,
            filter: 'text',
            resizable: true,
            floatingFilter: true,
          }
        ]
      },
      {
        headerName: 'Action',
        cellRendererFramework: ActionRendererComponent,
        width: 150,
      }
    ];
  }

  private calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      const model = this.gridOptions.api.getModel();
      const totalRows = this.rowData.length;
      const processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }

  public onModelUpdated() {
    console.log('onModelUpdated');
    this.calculateRowCount();
  }

  public onReady($event: GridReadyEvent) {
    console.log('onReady');
    this.calculateRowCount();
    if (this.gridOptions.api) {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }

  public onCellClicked($event: any) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  public onCellValueChanged($event: any) {
    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  onCellDoubleClicked($event: any) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellContextMenu($event: any) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellFocused($event: any) {
    console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
  }

  onRowSelected($event: RowSelectedEvent) {
    // taking out, as when we 'select all', it prints to much to the console!!
    console.log('onRowSelected: ' + $event.node.data.name);
  }
  onSelectionChanged() {
    console.log('selectionChanged');
  }

  // onBeforeFilterChanged() {
  //   console.log('beforeFilterChanged');
  // }
  //
  // onAfterFilterChanged() {
  //   console.log('afterFilterChanged');
  // }

  onFilterModified() {
    console.log('onFilterModified');
  }

  // onBeforeSortChanged() {
  //   console.log('onBeforeSortChanged');
  // }
  //
  // onAfterSortChanged() {
  //   console.log('onAfterSortChanged');
  // }

  onVirtualRowRemoved($event: any) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  onRowClicked($event: any) {
    console.log('onRowClicked: ' + $event.node.data.name);
  }

  public onQuickFilterChanged($event: any) {
    // @ts-ignore
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  onColumnEvent($event: any) {
    console.log('onColumnEvent: ' + $event);
  }

}

export function skillsCellRenderer(params: { data: any; }) {
  const data = params.data;
  const skills: string[] = [];
  RefData.IT_SKILLS.forEach(function (skill) {
    if (data && data.skills && data.skills[skill]) {
      const imgEle = `<img src='images/skills/${skill}.png' width="16px"  title="${skill}" alt="${skill}"/>`
      skills.push(imgEle);
    }
  });
  return skills.join(' ');
}

// export function countryCellRenderer(params: { value: string; }) {
//   // @ts-ignore
//   return `<img width='15' height='10' style='margin-bottom: 2px' src='images/flags/${RefData.COUNTRY_CODES[params.value]}.png' alt=""> ${params.value}`;
// }

function createRandomPhoneNumber() {
  let result = '+';
  for (let i = 0; i < 12; i++) {
    result += Math.round(Math.random() * 10);
    if (i === 2 || i === 5 || i === 8) {
      result += ' ';
    }
  }
  return result;
}
function percentCellRenderer(params: { value: any; }) {
  const value = params.value;

  const eDivPercentBar = document.createElement('div');
  eDivPercentBar.className = 'div-percent-bar';
  eDivPercentBar.style.width = value + '%';
  if (value < 20) {
    eDivPercentBar.style.backgroundColor = 'red';
  } else if (value < 60) {
    eDivPercentBar.style.backgroundColor = '#ff9900';
  } else {
    eDivPercentBar.style.backgroundColor = '#00A000';
  }

  const eValue = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = value + '%';

  const eOuterDiv = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  eOuterDiv.appendChild(eDivPercentBar);

  return eOuterDiv;
}

//Utility function used to pad the date formatting.
function pad(num: string | number, totalStringSize: number) {
  let asString = num + "";
  while (asString.length < totalStringSize) asString = "0" + asString;
  return asString;
}

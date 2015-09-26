
gridApp.controller('GridController', ['$scope', function ($scope) {

    //class Names
    $scope.gridControl = "gridControl";
    $scope.gridRowClass = "gridRow";
    $scope.rowDivClass = "rowDiv";
    $scope.rowClass = " gr";
    $scope.colAClass = "colA";
    $scope.colBClass = "colB";
    $scope.colCClass = "colC";
    $scope.colDClass = "colD";
    $scope.btnWarnClass = "btn btn-warning";

    $scope.rowId = 0;
    $scope.row = "row";
    $scope.button = "button";
    $scope.gridBody = "grid-body";
    $scope.gridHeader = "gridHeader"
    $scope.gridHeaderId = "grid-header";
    $scope.text = "text";
    $scope.selectedRow = 0;

    $scope.columnObj = {
        1: "Name",
        2: "Surname",
        3: "Occupation",
        4: "Age"
    };

    $scope.columns = ["1", "2"];
    $scope.add = {
        column:"1"
    };

    $scope.search = {
        column: "1",
        value: null
    };

    $scope.gridInit = function () {

    };

    $scope.appendRow = function () {
        var table = document.getElementById($scope.gridBody);
        var row = document.createElement("div");
        row.id = $scope.row + $scope.rowId;
        row.className = $scope.gridRowClass + $scope.rowClass;
        if ($scope.checColumnAvailable("1"))
        {
            row.appendChild($scope.addInput($scope.colAClass));
        }
        
        if ($scope.checColumnAvailable("2")) {
            row.appendChild($scope.addInput($scope.colBClass));
        }
        if ($scope.checColumnAvailable("3")) {
            row.appendChild($scope.addInput($scope.colCClass));
        }
        if ($scope.checColumnAvailable("4")) {
            row.appendChild($scope.addInput($scope.colDClass));
        }
        
        row.appendChild($scope.addCheckBox());
        row.appendChild($scope.addButton());
        table.appendChild(row);
    };

    $scope.checColumnAvailable = function (colValue) {
        var flag = true;
        if($scope.columns.indexOf(colValue) == -1)
        {
            flag = false;
        }
        return flag;
    };

    $scope.addRow = function () {
        $scope.appendRow();
    };

    $scope.deleteRow = function (event) {
        var rowId = event.target.parentElement.parentElement.id;
        var row = document.getElementById(rowId);
        var gridBody = document.getElementById($scope.gridBody);
        gridBody.removeChild(row);
    };

    $scope.updateCount = function (event) {
        if (event.target.checked) {
            $scope.$apply(function () {
                $scope.selectedRow++;
            });
        }
        else {
            $scope.$apply(function () {
                $scope.selectedRow--;
            });
        }

    };

    $scope.divForRow = function (element) {
        var Div = document.createElement("div");
        var colClass = element.id.split("-")[1];
        if(angular.isDefined(colClass))
        {
            Div.className = "col-lg-2 " + $scope.rowDivClass + " " + colClass;
        }
        else{
            Div.className = "col-lg-2 "+ $scope.rowDivClass ;
        }
        
        Div.appendChild(element);
        return Div;
    };

    $scope.addInput = function (column) {
        var input = document.createElement("input");
        input.type = "text";
        input.id = $scope.text + $scope.rowId + "-" + column;
        input.style.cssFloat = "left";
        input.readOnly = true;
        input.className = $scope.gridControl;
        input.onclick = $scope.enableControl;
        input.onblur = $scope.blurControl;
        return $scope.divForRow(input);
    };

    $scope.enableControl = function (event) {
        event.target.readOnly = false;
        event.target.className = "";
    };

    $scope.blurControl = function () {
        event.target.readOnly = true;
        event.target.className = $scope.gridControl;
    };

    $scope.addCheckBox = function () {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = false;
        checkbox.onchange = $scope.updateCount;
        return $scope.divForRow(checkbox);
    };

    $scope.addButton = function () {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.className = $scope.btnWarnClass;
        button.id = $scope.button + $scope.rowId;

        button.onclick = $scope.deleteRow;
        return $scope.divForRow(button);
    };

    $scope.addColumn = function () {
        if ($scope.columns.indexOf($scope.add.column) === -1)
        {
            var newColumn = document.createElement("div");
            newColumn.id = $scope.add.column;
            newColumn.className = "col-lg-2 " + $scope.gridHeader;
            newColumn.innerHTML = "<h5>" + $scope.columnObj[parseInt($scope.add.column)] + "</h5>";
            var header = document.getElementById($scope.gridHeaderId);
            header.appendChild(newColumn);
            $scope.columns.push($scope.add.column);
        }
        else {
            alert("column already present");
        }
    };

    $scope.getColumnClass = function (value) {
        var colClass = null;
        if (value === "1") {
            colClass = $scope.colAClass;
        } else if (value === "2") {
            colClass = $scope.colBClass;
        }
        else if (value === "3") {
            colClass = $scope.colCClass;
        }
        else {
            colClass = $scope.colDClass;
        }
        return colClass;
    };

    //TODO : Remove column functionality still a bit left
    $scope.removeColumn = function () {
        if($scope.columns.indexOf($scope.add.column) !== -1)
        {
            var gridheader = document.getElementById($scope.gridHeaderId);
            var colHeader = document.getElementById($scope.add.column);
            gridheader.removeChild(colHeader);
            var colClass = $scope.getColumnClass($scope.add.column);
            var body = document.getElementById($scope.gridBody);
            if(colClass !== null)
            {
                
                var rowColumns = document.getElementsByClassName(colClass);
                for(var i =0 ; i< rowColumns.length ; i++)
                {
                    body.removeChild(rowColumns[i]);
                }
                
                
            }
            $scope.columns.pop($scope.add.column);
        }
        else {
            alert("column not present");
        }
    };
}]);
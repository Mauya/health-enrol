/**
 * Created by User on 6/7/2017.
 */
queue()
    .defer(d3.json, "/FOHealth/projects")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {
    var FOHealthProjects = projectsJson;
    var dateFormat =d3.time.format("%Y");
    FOHealthProjects.forEach(function (d) {
        d["Academic_Year"] = dateFormat.parse(d["Academic_Year"]);
        d["Academic_Year"].setDate(1)
        d["Enrolments"] = +d["Enrolments"];
    });
    // Crossfilter instance
    var ndx = crossfilter(FOHealthProjects);

    // Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["Academic_Year"];
    });
    var CourseNameDim = ndx.dimension(function (d) {
        return d["Course"];
    });
    // var CourseStageDim = ndx.dimension(function (d) {
    //     return d["Course_Stage"];
    // });
    // var ModeGroupDim = ndx.dimension(function (d) {
    //     return d["Mode_Group"];
    // });
    // var LevelGroupDim = ndx.dimension(function (d) {
    //     return d["Level_Group"];
    // });
    // var ReasonForLeavingDim = ndx.dimension(function (d) {
    //     return d["Reason_For_Leaving"];
    // });
    var EnrolmentsDim = ndx.dimension(function (d) {
       return d["Enrolments"];
   });
        var FeesDim = ndx.dimension(function (d) {
            return d["Fees"];
        });
        // var GenderDim = ndx.dimension(function (d) {
        //     return d["Gender"];
        // });
        // var AgeDim = ndx.dimension(function (d) {
        //     return d["Age"];
        // });
        // var WhiteBMEDim = ndx.dimension(function (d) {
        //     return d["White_BME"];
        // });
        // var EthnicityGroupDim = ndx.dimension(function (d) {
        //     return d["Ethnicity_Group"];
        // });
        // var DisabilityDescriptionDim = ndx.dimension(function (d) {
        //     return d["Disability_Description"];
        // });
        // var DisabilityDim = ndx.dimension(function (d) {
        //     return d["Disability_YN"];
        // });
        var WithdrawalsDim = ndx.dimension(function (d) {
            return d["Withdrawals"];
        });


// Groups- calculate metrics
        var numProjectsByDate = dateDim.group();
        var numProjectsByCourseName = CourseNameDim.group();
        // var numProjectsByCourseStage = CourseStageDim.group();
       // var numProjectsByModeGroupDim = ModeGroupDim.group();
       //  var numProjectsByLevelGroupDim = LevelGroupDim.group();
        // var numProjectsByReasonForLeaving = ReasonForLeavingDim.group();

        // var numProjectsByGender = GenderDim.group();
        // var numProjectsByAge = AgeDim.group();
        var numProjectsByFees = FeesDim.group();
        // var numProjectsByWhiteBME = WhiteBMEDim.group();
        // var numProjectsByEthnicityGroup = EthnicityGroupDim.group();
        // var numProjectsByDisabilityDescription = DisabilityDescriptionDim.group();
        // var numProjectsByDisability = DisabilityDim.group();
        var numProjectsByWithdrawals = ndx.groupAll().reduceSum(function (d) {
            return d["Withdrawals"];
        });

    //all
        var all = ndx.groupAll();
        var numProjectsByEnrolments = ndx.groupAll().reduceSum(function (d) {
            return d["Enrolments"];
            });

//     var max_course = totalEnrolmentByCourse.top(1)[0].value;
        var minDate =dateDim.bottom(1)[0]["Academic_Year"];
        var maxDate =dateDim.top(1)[0]["Academic_Year"];
//     var minTotalEnrolments = totalEnrolmentsDim.bottom(1)[0]["Enrolments"];
//     var maxTotalEnrolments = totalEnrolmentsDim.top(1)[0]["Enrolments"];


// Apply DC and D3

        // Charts variables: chart binding to HTML elements by CSS ID selectors
        // Displayed in dash.html
        var selectFieldYear = dc.selectMenu('#menu-select-academic_year');
        var selectFieldCourse = dc.selectMenu('#menu-select-course');
        var totalEnrolmentsND = dc.numberDisplay('#total-enrolments-nd');
        var totalWithdrawalsND = dc.numberDisplay('#total-withdrawals-nd');
        var timeChart = dc.lineChart("#time-chart");
        var feesStatusChart = dc.pieChart('#fees-status-chart');
        //var levelGroupChart = dc.rowChart("#level-group-chart");
        //var modeGroupChart = dc.rowChart("#mode-group-chart");
        //var resourceTypeChart = dc.rowChart("#resource-type-row-chart");

        //filter
        /*These selectors filter data by:
         * - Academic Year
         * - Course
         */
        selectFieldYear
            .dimension(dateDim)
            .group(numProjectsByDate);

        selectFieldCourse
            .dimension(CourseNameDim)
            .group(numProjectsByCourseName);

        totalEnrolmentsND
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) {
                return d;
            })
            .group(numProjectsByEnrolments)
            .formatNumber(d3.format(","));

        totalWithdrawalsND
            .formatNumber(d3.format("d"))
            .valueAccessor(function(d){
                return d;
            })
            .group(numProjectsByWithdrawals)
            .formatNumber(d3.format(","));

        timeChart
            .width(600)
            .height(250)
            .margin({top:10, right:10, bottom:20, left:50})
            .dimension(dateDim)
            .group(numProjectsByDate)
            .transitionDuration(500)
            .elasticY(true)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .xAxis();

        feesStatusChart
            .height(200)
            .radius(90)
            .innerRadius(40)
            .transitionDuration(2000)
            .externalLabels(1)
            .dimension(FeesDim)
            .group(numProjectsByFees);

        dc.renderAll();

}


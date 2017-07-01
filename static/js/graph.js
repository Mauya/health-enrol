/**
 * Created by User on 6/7/2017.
 */
queue()
    .defer(d3.json, "/FOHealth/projects")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {
    var FOHealthProjects = projectsJson;
    FOHealthProjects.forEach(function (d) {
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
    var CourseStageDim = ndx.dimension(function (d) {
        return d["Course_Stage"];
    });
        var ModeGroupDim = ndx.dimension(function (d) {
            return d["Mode_Group"];
        });
        var LevelGroupDim = ndx.dimension(function (d) {
            return d["Level_Group"];
        });
    // var ReasonForLeavingDim = ndx.dimension(function (d) {
    //     return d["Reason_For_Leaving"];
    // });
    //     var EnrolmentsDim = ndx.dimension(function (d) {
    //        return d["Enrolments"];
    //    });
        var FeesDim = ndx.dimension(function (d) {
            return d["Fees_Status"];
        });
        var GenderDim = ndx.dimension(function (d) {
            return d["Gender"];
        });
        var AgeDim = ndx.dimension(function (d) {
            return d["Age"];
        });
        var WhiteBMEDim = ndx.dimension(function (d) {
            return d["White_BME"];
        });
        var DisabilityDim = ndx.dimension(function (d) {
            return d["Disability_YN"];
        });
        // var WithdrawalsDim = ndx.dimension(function (d) {
        //     return d["Withdrawals"];
        // });


// Groups- calculate metrics
        var numProjectsByDate = dateDim.group();
        var numProjectsByCourseName = CourseNameDim.group();
        var numProjectsByEnrolments = ndx.groupAll().reduceSum(function (d) {
            return d["Enrolments"];
            });
        var numProjectsByWithdrawals = ndx.groupAll().reduceSum(function (d) {
            return d["Withdrawals"];
        });
        var numProjectsByFees = FeesDim.group();
        var numProjectsByLevelGroup = LevelGroupDim.group();
        var numProjectsByModeGroup = ModeGroupDim.group();
        var numProjectsByCourseStage = CourseStageDim.group();
        var numProjectsByGender = GenderDim.group();
        var numProjectsByAge = AgeDim.group();
        var numProjectsByWhiteBME = WhiteBMEDim.group();
        var numProjectsByDisability = DisabilityDim.group();

        function save_first_order() {
            var original_value = {};
            return function(chart) {
                chart.group().all().forEach(function(kv) {
                    original_value[kv.key] = kv.value;
                 });
                chart.ordering(function(kv) {
                    return -original_value[kv.key];
                });
            };
        }


    //all
    //     var all = ndx.groupAll();


//     var max_course = totalEnrolmentByCourse.top(1)[0].value;
//     var minTotalEnrolments = totalEnrolmentsDim.bottom(1)[0]["Enrolments"];
//     var maxTotalEnrolments = totalEnrolmentsDim.top(1)[0]["Enrolments"];

// Apply DC and D3

        // Charts variables: chart binding to HTML elements by CSS ID selectors
        // Displayed in dash.html
        var selectFieldYear = dc.selectMenu('#menu-select-academic_year');
        var selectFieldCourse = dc.selectMenu('#menu-select-course');
        var totalEnrolmentsND = dc.numberDisplay('#total-enrolments-nd');
        var totalWithdrawalsND = dc.numberDisplay('#total-withdrawals-nd');
        var totalEnrolmentChart = dc.lineChart("#total-enrolment-chart");
        var feesStatusChart = dc.pieChart('#fees-status-chart');
        var levelGroupChart = dc.pieChart("#level-group-chart");
        var modeGroupChart = dc.pieChart("#mode-group-chart");
        var courseStageChart = dc.pieChart('#course-stage-chart');
        var genderChart = dc.rowChart('#gender-chart');
        var ageChart = dc.rowChart('#age-chart');
        var ethnicityChart = dc.rowChart('#ethnicity-chart');
        var disabilityChart = dc.rowChart('#disability-chart');

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

        totalEnrolmentChart
            .width(500)
            .height(250)
            .dimension(dateDim)
            .group(numProjectsByDate)
            .x(d3.scale.ordinal().domain(dateDim))
            .xUnits(dc.units.ordinal)// Tell Dc.js that we're using an ordinal x axis
            .xAxis().ticks(5);

        feesStatusChart
            .width(300)
            .height(250)
            .radius(100)
            .innerRadius(0)
            .transitionDuration(1000)
            .legend(dc.legend())
            .dimension(FeesDim)
            .group(numProjectsByFees);

        levelGroupChart
            .height(200)
            .radius(80)
            .innerRadius(0)
            .dimension(LevelGroupDim)
            .group(numProjectsByLevelGroup);


        modeGroupChart
            .height(200)
            .radius(80)
            .innerRadius(0)
            .transitionDuration(1000)
            .dimension(ModeGroupDim)
            .group(numProjectsByModeGroup);

        courseStageChart
            .height(200)
            .radius(80)
            .innerRadius(0)
            .transitionDuration(1000)
            .dimension(CourseStageDim)
            .group(numProjectsByCourseStage);

        genderChart
            .width(250)
            .height(150)
            .dimension(GenderDim)
            .group(numProjectsByGender)
            .yAxisLabel("Gender")
            .xAxis().ticks(3);

        ageChart
            .width(250)
            .height(200)
            .dimension(AgeDim)
            .group(numProjectsByAge)
            .xAxis().ticks(3)
            .yAxisLabel("Age");

        ethnicityChart
            .width(250)
            .height(200)
            .dimension(WhiteBMEDim)
            .group(numProjectsByWhiteBME)
            .yAxisLabel("Ethnicity")
            .xAxis().ticks(3);

        disabilityChart
            .width(250)
            .height(200)
            .dimension(DisabilityDim)
            .group(numProjectsByDisability)
            .yAxisLabel("Disability")
            .xAxis().ticks(3);

        dc.renderAll();

}


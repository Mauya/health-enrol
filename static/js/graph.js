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


    //all
    //     var all = ndx.groupAll();

// Apply DC and D3

        // Charts variables: chart binding to HTML elements by CSS ID selectors
        // Displayed in dash.html
        var selectFieldYear = dc.selectMenu('#menu-select-academic_year');
        var selectFieldCourse = dc.selectMenu('#menu-select-course');
        var totalEnrolmentsND = dc.numberDisplay('#total-enrolments-nd');
        var totalWithdrawalsND = dc.numberDisplay('#total-withdrawals-nd');
        var totalEnrolmentChart = dc.barChart("#total-enrolment-chart");
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
            .width(600)
            .height(250)
            .margins({top: 10, right: 10, bottom: 30, left: 50})
            .dimension(dateDim)
            .group(numProjectsByDate)
            .transitionDuration(500)
            .elasticY(true)
            .x(d3.scale.ordinal().domain([2013,2014,2015,2016,2017]))
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total Enrolment").xAxisLabel('Academic Year');
            //.xAxis().ticks(6);

        feesStatusChart
            .width(250)
            .height(250)
            .innerRadius(0)
            .transitionDuration(500)
            .dimension(FeesDim)
            .group(numProjectsByFees)
            .ordinalColors(['#e41a1c','#377eb8','#4daf4a','#984ea3']);

        levelGroupChart
            .height(250)
            .innerRadius(0)
            .dimension(LevelGroupDim)
            .group(numProjectsByLevelGroup)
            .externalLabels(10)
            .ordinalColors(['#377eb8','#4daf4a','#984ea3','#ff7f00']);


        modeGroupChart
            .height(250)
            .innerRadius(0)
            .transitionDuration(1000)
            .dimension(ModeGroupDim)
            .group(numProjectsByModeGroup)
            .ordinalColors(['#377eb8','#4daf4a','#984ea3','#ff7f00']);

        courseStageChart
            .height(250)
            .innerRadius(0)
            .transitionDuration(1000)
            .dimension(CourseStageDim)
            .group(numProjectsByCourseStage)
            .ordinalColors(['#377eb8','#4daf4a','#984ea3','#ff7f00']);

        genderChart
            .width(250)
            .height(250)
            .dimension(GenderDim)
            .group(numProjectsByGender)
            .colors(d3.scale.category20b())
            .label(function (d) {
                return d.key;
            })
            .elasticX(true)
           .xAxis().ticks(3);

        ageChart
            .width(250)
            .height(250)
            .dimension(AgeDim)
            .group(numProjectsByAge)
            .colors(d3.scale.category20b())
            .label(function (d) {
                return d.key;
            })
            .elasticX(true)
            .xAxis().ticks(4);

        ethnicityChart
            .width(250)
            .height(250)
            .dimension(WhiteBMEDim)
            .group(numProjectsByWhiteBME)
            .colors(d3.scale.category20b())
            .label(function (d) {
                return d.key;
            })
            .elasticX(true)
            .xAxis().ticks(4);

        disabilityChart
            .width(250)
            .height(250)
            .dimension(DisabilityDim)
            .group(numProjectsByDisability)
            .colors(d3.scale.category20b())
            .label(function (d) {
                return d.key;
            })
            .elasticX(true)
            .xAxis().ticks(3);

        dc.renderAll();
}


/**
 * Created by User on 6/7/2017.
 */
queue()
    .defer(d3.json, "/FOHealth/projects")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    var FOHealthProjects = projectsJson;

    var dateFormat = d3.time.format("%Y");
    FOHealthProjects.forEach(function (d) {
    d["Academic_Year"] = dateFormat.parse(d["Academic_Year"]);
    d["Academic_Year"].setDate(1);
    d["Starters"] = +d["Starters"];
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
    var ReasonForLeavingDim = ndx.dimension(function (d) {
        return d["Reason_For_Leaving"];
    });
    var TotalEnrollmentDim = ndx.dimension(function (d) {
        return d["starters"];
    });
    var FeesDim = ndx.dimension(function (d) {
        return d["Fees"];
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
    var EthnicityGroupDim = ndx.dimension(function (d) {
        return d["Ethnicity_Group"];
    });
    var DisabilityDescriptionDim = ndx.dimension(function (d) {
        return d["Disability_Description"];
    });
    var DisabilityDim = ndx.dimension(function (d) {
        return d["Disability_YN"];
    });
    var WithdrawalsDim = ndx.dimension(function (d) {
        return d["Withdrawals"];
    });


// Groups- calculate metrics
    var numProjectsByDate = dateDim.group();
    var numProjectsByCourseName = CourseNameDim.group();
    var numProjectsByCourseStage = CourseStageDim.group();
    var numProjectsByModeGroupDim = ModeGroupDim.group();
    var numProjectsByLevelGroupDim = LevelGroupDim.group();
    var numProjectsByReasonForLeaving = ReasonForLeavingDim.group();
    var totalEnrollment = ndx.groupAll().reduceSum(function(d) {return d["starters"];});

    var numProjectsByGender = GenderDim.group();+
    var numProjectsByAge = AgeDim.group();
    var numProjectsByFees = FeesDim();
    var numProjectsByWhiteBME = WhiteBMEDim.group();
    var numProjectsByEthnicityGroup = EthnicityGroupDim.group();
    var numProjectsByDisabilityDescription = DisabilityDescriptionDim.group();
    var numProjectsByDisability = DisabilityDim.group();
    var numProjectsByWithdrawals = WithdrawalsDim.group();

//all

    var all = ndx.groupall();

//reduce
    var TotalEnrollmentByCourse = CourseNameDim.group().reduceSum(function (d) {
        return d["starters"];
    });
    var TotalEnrollmentByAcademicYear = dateDim.group().reduceSum(function (d) {
        return d["starters"];
    });
    var totalWithdrawals = ndx.groupAll().reduceSum(function (d) {
        return d["Withdrawals"];
    });
    var TotalEnrollmentByGender = ndx.groupAll().reduceSum(function (d) {
        return d["Gender"];
    });
    var TotalEnrollmentByAge = ndx.groupAll().reduceSum(function (d) {
        return d["Age"];
    });
    var TotalEnrollmentByFees = ndx.groupall().reducesum(function (d) {
        return d["Fees"];
    });
    var TotalEnrollmentByWhiteBME = ndx.groupAll().reduceSum(function (d) {
        return d["White_BME"];
    });
    var TotalEnrollmentByEthnicity = ndx.groupAll().reduceSum(function (d) {
        return d["Ethnicity_Group"];
    });
    var TotalEnrollmentByDisabilityDescription = ndx.groupAll().reduceSum(function (d) {
        return d["Disability_Description"];
    });
    var TotalEnrollmentByDisability = ndx.groupAll().reduceSum(function (d) {
        return d["Disability_YN"];
    });


// Apply DC and D3

    // Charts variables: chart binding to HTML elements by CSS ID selectors

    // Displayed in dash.html
    var selectFieldYear = dc.selectMenu('#menu-select-academic_year');
    var selectFieldCourse = dc.selectMenu('#menu-select-course');
    var enrollmentCount = dc.numberDisplay(#"num-display-enrolments")

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

    enrollmentCount
        .formatNumber(d3.format(","))
        .valueAssessor(function (d) {return d;})
        .group(all);




    dc.renderAll();
}
/**
 * Created by User on 6/7/2017.
 */
queue()
    .defer(d3.json, "/FOHealth/projects")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {
    var FOHealthProjects = projectsJson;
    FOHealthProjects.forEach(function (d) {
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
    // var totalEnrollmentDim = ndx.dimension(function (d) {
    //     return d["starters"];
        // });
        // var FeesDim = ndx.dimension(function (d) {
        //     return d["Fees"];
        // });
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
        // var WithdrawalsDim = ndx.dimension(function (d) {
        //     return d["Withdrawals"];
        // });


// Groups- calculate metrics
        var numProjectsByDate = dateDim.group();
        var numProjectsByCourseName = CourseNameDim.group();
        // var numProjectsByCourseStage = CourseStageDim.group();
        // var numProjectsByModeGroupDim = ModeGroupDim.group();
        // var numProjectsByLevelGroupDim = LevelGroupDim.group();
        // var numProjectsByReasonForLeaving = ReasonForLeavingDim.group();
        // var totalEnrollment = ndx.groupAll().reduceSum(function (d) {
        //     return d["starters"];
        // });
        // var numProjectsByGender = GenderDim.group();
        // var numProjectsByAge = AgeDim.group();
        // var numProjectsByFees = FeesDim();
        // var numProjectsByWhiteBME = WhiteBMEDim.group();
        // var numProjectsByEthnicityGroup = EthnicityGroupDim.group();
        // var numProjectsByDisabilityDescription = DisabilityDescriptionDim.group();
        // var numProjectsByDisability = DisabilityDim.group();
        // var numProjectsByWithdrawals = WithdrawalsDim.group();

//all
//     var all = ndx.groupAll();
//         var totalEnrollment = ndx.groupAll().reduceSum(function (d) {
//             return d["starters"];
//         });
//     var max_course = totalEnrollmentByCourse.top(1)[0].value;
//     var minDate = dateDim.bottom(1)[0]["Academic_Year"];
//     var maxDate = dateDim.top(1)[0]["Academic_Year"];
//     var mintotalEnrollment = totalEnrollmentDim.bottom(1)[0]["Starters"];
//     var maxTotalEnrollment = totalEnrollmentDim.top(1)[0]["Starters"];

//reduce
//     var totalEnrollmentByCourse = CourseNameDim.group().reduceSum(function (d) {
//         return d["starters"];
//     });
        // var totalEnrollmentByAcademicYear = dateDim.group().reduceSum(function (d) {
        //     return d["starters"];
        // });
        // var totalWithdrawals = ndx.groupAll().reduceSum(function (d) {
        //     return d["Withdrawals"];
        // });
        // var totalEnrollmentByGender = ndx.groupAll().reduceSum(function (d) {
        //     return d["Gender"];
        // });
        // var totalEnrollmentByAge = ndx.groupAll().reduceSum(function (d) {
        //     return d["Age"];
        // });
        // var totalEnrollmentByFees = ndx.groupall().reducesum(function (d) {
        //     return d["Fees"];
        // });
        // var totalEnrollmentByWhiteBME = ndx.groupAll().reduceSum(function (d) {
        //     return d["White_BME"];
        // });
        // var totalEnrollmentByEthnicity = ndx.groupAll().reduceSum(function (d) {
        //     return d["Ethnicity_Group"];
        // });
        // var totalEnrollmentByDisabilityDescription = ndx.groupAll().reduceSum(function (d) {
        //     return d["Disability_Description"];
        // });
        // var totalEnrollmentByDisability = ndx.groupAll().reduceSum(function (d) {
        //     return d["Disability_YN"];
        // });


// Apply DC and D3

        // Charts variables: chart binding to HTML elements by CSS ID selectors
        // Displayed in dash.html
        var selectFieldYear = dc.selectMenu('#menu-select-academic_year');
        var selectFieldCourse = dc.selectMenu('#menu-select-course');
        // var totalEnrollmentND = dc.numberDisplay('#total-enrollment-nd');
        // var totalInternationalND = dc.numberDisplay("#total-international-nd");
        // var totalHomeEuND = dc.numberDisplay("#total-home/eu-nd");
        // var totalWithdrawalsND = dc.numberDisplay("#total-withdrawals-nd");


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

        // totalEnrollmentND
        //     .formatNumber(totalEnrollment)
        //     .valueAccessor(function (d) {
        //         return d;
        //     })
        //     .group(totalEnrollment);

        // totalWithdrawalsND
        //     .formatNumber(d3.format("d"))
        //     .valueAccessor(function(d){
        //         return d;
        //     })
        //     .group(numProjectsByWithdrawals);


        dc.renderAll();

    });
}


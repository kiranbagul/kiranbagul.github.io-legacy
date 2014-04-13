   $(document).ready(function () {
       // Cache the Window object
       $window = $(window);
       $('section[data-type="background"]').each(function () {
           var $bgobj = $(this); // assigning the object
           $(window).scroll(function () {
               // Scroll the background at var speed
               // the yPos is a negative value because we're scrolling it UP!
               var yPos = -($window.scrollTop() / $bgobj.data('speed'));
               // Put together our final background position
               var coords = '50% ' + (yPos) + 'px';
               // Move the background
               $bgobj.css({
                   backgroundPosition: coords
               });
           }); // window scroll Ends
       });
   });
   /* 
    * Create HTML5 elements for IE's sake
    */
   document.createElement("article");
   document.createElement("section");

   /*-------*/
   $('section').height($(window).height());

   var divList = ['home', 'summary', 'skills', 'experience', 'edu', 'hobbies'];
   var elem = 0;

   function traverseToDiv() {
       $("#rotate").css({
           display: 'none'
       });
       if (elem === 0) {
           $('.previous').css({
               display: 'none'
           });
           $('.next').css({
               display: 'block'
           });
       } else if (divList.length - 1 > elem > 0) {
           $('.previous').css({
               display: 'block'
           });
           $('.next').css({
               display: 'block'
           });
       } else if (elem == divList.length - 1) {
           $('.next').css({
               display: 'none'
           });
           $('.previous').css({
               display: 'block'
           });
       }
       $('html, body').animate({
           scrollTop: $("section[id=" + divList[elem] + "]").offset().top - 70
       }, 1000);
   }


   traverseToDiv();

   function scrollToDiv(divId) {
       elem = divList.indexOf(divId);
       traverseToDiv();
   }

   $('.next').click(function () {
       ++elem;
       traverseToDiv();
   });

   $('.previous').click(function () {
       --elem;
       traverseToDiv();
   });

   /* ---------------- */

   var terms = ["I code", "I learn", "I design", "I innovate"]; //array of terms to rotate

   function rotateTerm() {
       var ct = $("#rotate").data("term") || 0;
       $("#rotate").data("term", ct == terms.length - 1 ? 0 : ct + 1).text(terms[ct]).slideDown(500).delay(2000).slideUp(500, rotateTerm);
   }
   $(rotateTerm);

   /*----------*/

   google.setOnLoadCallback(drawChart);

   function drawChart() {
       var container = document.getElementById('education');
       var chart = new google.visualization.Timeline(container);
       var dataTable = new google.visualization.DataTable();

       dataTable.addColumn({
           type: 'string',
           id: 'Role'
       });
       dataTable.addColumn({
           type: 'string',
           id: 'Name'
       });
       dataTable.addColumn({
           type: 'date',
           id: 'Start'
       });
       dataTable.addColumn({
           type: 'date',
           id: 'End'
       });
       dataTable.addRows([
                ['Bachelor of Engineering - Electrical', '62 %, KKWIEER, Nashik', new Date(2003, 8, 8), new Date(2007, 8, 8)],
                ['HSC', '73.33%, KTHM College, Nashik', new Date(2001, 6, 6), new Date(2003, 6, 6)],
                ['SSC', 'Nashik Board', new Date(2000, 6, 6), new Date(2001, 6, 6)]
            ]);

       var options = {
           timeline: {
               groupByRowLabel: false
           }
       };

       chart.draw(dataTable, options);
   }
   /* ---------------- */

   var width = $(window).width(),
       height = $(window).height();
   var radius = 30;
   var linkDistance = 30;
   var friction = 0.3;
   if (width > 767) {
       radius = 70;
       linkDistance = 100;
       friction = 0.8;
   }

   var color = d3.scale.category20();

   var force = d3.layout.force()
       .charge(-2000)
       .friction(friction)
       .linkDistance(linkDistance)
       .size([width, height]);

   var svg = d3.select("#viz").append("svg")
       .attr("width", width)
       .attr("height", height);

   var drawGraph = function (graph) {
       force
           .nodes(graph.nodes)
           .links(graph.links)
           .start();

       var link = svg.selectAll(".link")
           .data(graph.links)
           .enter().append("line")
           .attr("class", "link")
           .style("stroke-width", function (d) {
               return Math.sqrt(d.value);
           });

       var gnodes = svg.selectAll('g.gnode')
           .data(graph.nodes)
           .enter()
           .append('g')
           .classed('gnode', true);

       var node = gnodes.append("circle")
           .attr("class", "node")
           .attr("r", radius)
           .style("fill", function (d) {
               return color(d.group);
           })
           .call(force.drag);

       var labels = gnodes.append("text")
           .text(function (d) {
               return d.name;
           });

       force.on("tick", function () {
           link.attr("x1", function (d) {
               return d.source.x;
           })
               .attr("y1", function (d) {
                   return d.source.y;
               })
               .attr("x2", function (d) {
                   return d.target.x;
               })
               .attr("y2", function (d) {
                   return d.target.y;
               });

           gnodes.attr("transform", function (d) {
               return 'translate(' + [d.x, d.y] + ')';
           });



       });
   };
   var graph = {
       "nodes": [
           {
               "name": "Application Development",
               "group": 0
        },
           {
               "name": "Server",
               "group": 1
        },
           {
               "name": "Browser",
               "group": 1
        },
           {
               "name": "JAVA",
               "group": 2
        },
           {
               "name": "J2EE",
               "group": 2
        },
           {
               "name": "NodeJs",
               "group": 2
        },
           {
               "name": "REST API's",
               "group": 2
        },
           {
               "name": "JAVASCRIPT",
               "group": 3
        },
           {
               "name": "CSS",
               "group": 3
        },
           {
               "name": "HTML",
               "group": 3
        },
           {
               "name": "JMS",
               "group": 3
        },
           {
               "name": "EhCache",
               "group": 2
        },
           {
               "name": "Design Patterns",
               "group": 2
        },
           {
               "name": "Collections",
               "group": 2
        },
           {
               "name": "Multithreading",
               "group": 2
        },
           {
               "name": "TDD",
               "group": 4
        },
           {
               "name": "Agile",
               "group": 4
        },
           {
               "name": "Data Structures",
               "group": 4
        },
           {
               "name": "Eclipse/Webstorm/Brackets",
               "group": 4
        },
           {
               "name": "sql/noSql",
               "group": 4
        }


  ],
       "links": [
           {
               "source": 0,
               "target": 0,
               "value": 1
        },
           {
               "source": 1,
               "target": 0,
               "value": 1
        },
           {
               "source": 2,
               "target": 0,
               "value": 1
        },
           {
               "source": 3,
               "target": 1,
               "value": 1
        },
           {
               "source": 4,
               "target": 1,
               "value": 1
        },
           {
               "source": 5,
               "target": 1,
               "value": 1
        },
           {
               "source": 6,
               "target": 1,
               "value": 1
        },
           {
               "source": 7,
               "target": 2,
               "value": 1
        },
           {
               "source": 8,
               "target": 2,
               "value": 1
        },
           {
               "source": 9,
               "target": 2,
               "value": 1
        },
           {
               "source": 10,
               "target": 1,
               "value": 1
        },
           {
               "source": 11,
               "target": 1,
               "value": 1
        },
           {
               "source": 12,
               "target": 1,
               "value": 1
        },
           {
               "source": 13,
               "target": 1,
               "value": 1
        },
           {
               "source": 14,
               "target": 1,
               "value": 0
        },
           {
               "source": 15,
               "target": 4,
               "value": 0
        },
           {
               "source": 16,
               "target": 4,
               "value": 0
        },
           {
               "source": 17,
               "target": 4,
               "value": 0
        },
           {
               "source": 18,
               "target": 4,
               "value": 0
        },
           {
               "source": 19,
               "target": 4,
               "value": 0
           }
  ]
   };
   drawGraph(graph);



   /* ------------ */
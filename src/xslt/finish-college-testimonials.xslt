<?xml version="1.0" encoding="UTF-8"?>
<!--
@Author: Colin Osterhout <ctosterhout>
@Date:   2016-07-12T14:27:22-08:00
@Email:  ctosterhout@alaska.edu
@Project: BERT
@Last modified by:   ctosterhout
@Last modified time: 2016-07-21T16:51:25-08:00
@License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
-->

<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="http://www.pnp-software.com/XSLTdoc"
    xmlns:string="my:string"
    exclude-result-prefixes="string xd"
    >

    <xsl:import href="bs3/default.xslt"/>
    <xd:doc type="stylesheet">
        <xd:short>Stylesheet used to override the default video-container behavior in order to provide custom layout of videos on the Finish College Alaska landing page.</xd:short>
        <xd:detail>
            <p>The default behavior of the video-container stylesheet is to output a single video embed, potentially wrapped in a thumbnail. This stylesheet overrides that in order to display a set of videos in a grid format.</p>
        </xd:detail>
        <xd:author>Colin Osterhout (ctoterhout@alaska.edu)</xd:author>
        <xd:copyright>University of Alaska Southeast, 2016</xd:copyright>
    </xd:doc>

    <xsl:strip-space elements="*"/>
    <xsl:output
          method='html'
          indent='yes'
          omit-xml-declaration='yes'
          />

    <xd:doc>
        Match the top level system-index-block, invoking the locally defined system-block template
    </xd:doc>
    <xsl:template match="system-index-block">
        <div class="row page-section">
            <div class="col-sm-12">
                <div class="row section-title">
                    <div class="col-sm-12">
                        <h2>What our <span class='title-highlight'>students</span> say</h2>
                    </div>
                </div>
                <div class="row section-content">
                    <xsl:apply-templates select="system-block[.//video-container]"/>
                </div>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="system-block[.//video-container]">
        <div class="col-sm-4">
            <xsl:apply-templates select="system-data-structure/video-container"/>
        </div>
    </xsl:template>
</xsl:stylesheet>

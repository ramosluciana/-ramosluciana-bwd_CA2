<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
    
                <table id="menuTable" class="indent">
                    <thead>
                        <tr>
                            <th colspan="3">Caramelu Bakery</th>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/carameluBakery/product-type">
                            <tr>
                                <td colspan="3">
                                    <xsl:value-of select="@name" />
                                </td>
                            </tr>
                            <xsl:for-each select="product">
                                <tr id="{position()}">
                                        <xsl:attribute name="GlutenFree">
                                        <xsl:value-of select="boolean(@GlutenFree)" />
                                    </xsl:attribute>
                                    <td >
                                        <xsl:value-of select="prodTitle" />
                                    </td>

                                    <td>
                                        <xsl:value-of select="price" />
                                    </td>

                                    <td>
                                        <xsl:value-of select="description" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table>
    </xsl:template>
</xsl:stylesheet>
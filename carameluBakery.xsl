<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
                <table id="menuTable" class="indent">
                    <thead>
                        <tr>
                            <th colspan="3">Caramelu Bakery</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>prodTitle</th>
                            <th>cakeShape</th>
                            <th>size</th>
                            <th>price</th>
                            
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
                                <tr>
                                    <xsl:attribute name="GlutenFree">
                                        <xsl:value-of select="boolean(./@GlutenFree)" />
                                    </xsl:attribute>

                                    <td align="center">
                                        <input name="item0" type="checkbox" />
                                    </td>

                                    <td>
                                        <xsl:value-of select="prodTitle" />
                                    </td>

                                    <td align="right">
                                        <xsl:value-of select="cakeShape" />
                                    </td>

                                    <td align="right">
                                        <xsl:value-of select="size" />
                                    </td>

                                    <td align="right">
                                        <xsl:value-of select="price" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table>
    </xsl:template>
</xsl:stylesheet>
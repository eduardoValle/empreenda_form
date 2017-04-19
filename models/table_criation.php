<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 18/04/2017
 * Time: 16:11
 */

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

function eea_uninstall_db() {

    dbDelta("DROP TABLE IF EXISTS `eea_coordinator`");
    dbDelta("DROP TABLE IF EXISTS `eea_members`");
    dbDelta("DROP TABLE IF EXISTS `eea_institution`");
    dbDelta("DROP TABLE IF EXISTS `eea_campus`");
    dbDelta("DROP TABLE IF EXISTS `eea_discipline`");
    dbDelta("DROP TABLE IF EXISTS `eea_functions`");
    dbDelta("DROP TABLE IF EXISTS `eea_participation`");
    dbDelta("DROP TABLE IF EXISTS `eea_partnerships`");
    dbDelta("DROP TABLE IF EXISTS `eea_host_institutions`");
    dbDelta("DROP TABLE IF EXISTS `eea_financial_resources`");
}


function eea_install_db() {

    /************
     * TABELAS *
     ***********/

    $sql = "
        --
        -- Estrutura da tabela `eea_campus`
        --

        CREATE TABLE IF NOT EXISTS `eea_campus` (
          `id_campus` int(11) NOT NULL AUTO_INCREMENT,
          `name` varchar(255) DEFAULT NULL,
          `cnpj` varchar(255) DEFAULT NULL,
          `address` varchar(255) DEFAULT NULL,
          `email` varchar(255) DEFAULT NULL,
          `phone` varchar(255) DEFAULT NULL,
          `responsible` varchar(255) DEFAULT NULL,
          `phone_responsible` varchar(255) DEFAULT NULL,
          `id_institution` int(11) DEFAULT NULL,
          PRIMARY KEY (`id_campus`),
          KEY `id_institution` (`id_institution`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

        -- --------------------------------------------------------
    ";

    dbDelta($sql);

    $sql = "
        --
        -- Estrutura da tabela `eea_coordinator`
        --

        CREATE TABLE IF NOT EXISTS `eea_coordinator` (
          `id_coordenador` int(255) NOT NULL AUTO_INCREMENT,
          `name` varchar(255) DEFAULT NULL,
          `cpf` varchar(255) DEFAULT NULL,
          `email` varchar(255) DEFAULT NULL,
          `phone` varchar(255) DEFAULT NULL,
          `mobile` varchar(255) DEFAULT NULL,
          `responsible` varchar(255) DEFAULT NULL,
          `lattes` varchar(255) DEFAULT NULL,
          `experience` varchar(3100) DEFAULT NULL,
          `external_participation` varchar(1600) DEFAULT NULL,
          `motivation` varchar(2100) DEFAULT NULL,
          PRIMARY KEY (`id_coordenador`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_discipline`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_discipline` (
          `id_discipline` int(11) NOT NULL AUTO_INCREMENT,
          `name` varchar(255) DEFAULT NULL,
          `optativa` varchar(255) DEFAULT NULL,
          `code_discipline` varchar(255) DEFAULT NULL,
          `teacher` varchar(255) DEFAULT NULL,
          `n_students` int(11) DEFAULT NULL,
          `id_campus` int(11) DEFAULT NULL,
          `id_member` int(11) DEFAULT NULL,
          PRIMARY KEY (`id_discipline`),
          KEY `id_member2` (`id_member`),
          KEY `id_campus` (`id_campus`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_financial_resources`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_financial_resources` (
          `id_financial_resources` int(11) NOT NULL AUTO_INCREMENT,
          `own_resource` varchar(255) DEFAULT NULL,
          `partner_features` varchar(255) DEFAULT NULL,
          `cnpj` varchar(255) DEFAULT NULL,
          `address` varchar(255) DEFAULT NULL,
          `contact_person` varchar(1600) DEFAULT NULL,
          `id_participation` int(11) DEFAULT NULL,
          PRIMARY KEY (`id_financial_resources`),
          KEY `id_participation3` (`id_participation`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_functions`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_functions` (
          `id_functions` int(11) NOT NULL AUTO_INCREMENT,
          `name` varchar(255) DEFAULT NULL,
          `id_member` int(255) DEFAULT NULL,
          PRIMARY KEY (`id_functions`),
          KEY `id_member` (`id_member`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_host_institutions`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_host_institutions` (
          `id_host_institutions` int(11) NOT NULL,
          `name` varchar(255) DEFAULT NULL,
          `address` varchar(255) DEFAULT NULL,
          `maximum_capacity` varchar(255) DEFAULT NULL,
          `optional_features` varchar(2100) DEFAULT NULL,
          `id_participation` int(11) DEFAULT NULL,
          PRIMARY KEY (`id_host_institutions`),
          KEY `id_participation` (`id_participation`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_institution`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_institution` (
          `id_institution` int(11) NOT NULL AUTO_INCREMENT,
          `name` varchar(255) DEFAULT NULL,
          PRIMARY KEY (`id_institution`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_members`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_members` (
          `id_member` int(255) NOT NULL AUTO_INCREMENT,
          `name` varchar(255) DEFAULT NULL,
          `lattes` varchar(255) DEFAULT NULL,
          `cpf` varchar(255) DEFAULT NULL,
          `id_coordenador` int(255) DEFAULT NULL,
          PRIMARY KEY (`id_member`),
          KEY `id_coordenador` (`id_coordenador`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_participation`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_participation` (
          `id_participation` int(11) NOT NULL AUTO_INCREMENT,
          `previous_participations` varchar(4100) DEFAULT NULL,
          `dissemination_plan` varchar(4100) DEFAULT NULL,
          PRIMARY KEY (`id_participation`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    ";

    dbDelta($sql);

    $sql = "
        -- --------------------------------------------------------
        
        --
        -- Estrutura da tabela `eea_partnerships`
        --
        
        CREATE TABLE IF NOT EXISTS `eea_partnerships` (
          `id_partnerships` int(11) NOT NULL AUTO_INCREMENT,
          `historic` varchar(4000) DEFAULT NULL,
          `id_participation` int(255) DEFAULT NULL,
          `partnerships_between_institutions` varchar(3000) DEFAULT NULL,
          `partnerships_between_campus` varchar(3000) DEFAULT NULL,
          `partnerships_for_pea` varchar(3000) DEFAULT NULL,
          PRIMARY KEY (`id_partnerships`),
          KEY `id_participation2` (`id_participation`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
    ";
    dbDelta($sql);


    /***************
     * Foreign Keys
     **************/

    $fks = "
        --
        -- Limitadores para a tabela `eea_campus`
        --
        ALTER TABLE `eea_campus`
          ADD CONSTRAINT `id_institution` FOREIGN KEY (`id_institution`) REFERENCES `eea_institution` (`id_institution`) ON DELETE CASCADE ON UPDATE CASCADE;
        ";

    dbDelta($fks);

    $fks = "
        --
        -- Limitadores para a tabela `eea_discipline`
        --
        ALTER TABLE `eea_discipline`
          ADD CONSTRAINT `id_campus` FOREIGN KEY (`id_campus`) REFERENCES `eea_campus` (`id_campus`) ON DELETE CASCADE ON UPDATE CASCADE,
          ADD CONSTRAINT `id_member2` FOREIGN KEY (`id_member`) REFERENCES `eea_members` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE;
    ";

    dbDelta($fks);

    $fks = "
        --
        -- Limitadores para a tabela `eea_financial_resources`
        --
        ALTER TABLE `eea_financial_resources`
          ADD CONSTRAINT `id_participation3` FOREIGN KEY (`id_participation`) REFERENCES `eea_participation` (`id_participation`) ON DELETE CASCADE ON UPDATE CASCADE;
    ";

    dbDelta($fks);

    $fks = "
        --
        -- Limitadores para a tabela `eea_functions`
        --
        ALTER TABLE `eea_functions`
          ADD CONSTRAINT `id_member` FOREIGN KEY (`id_member`) REFERENCES `eea_members` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE;
    ";

    dbDelta($fks);

    $fks = "
        --
        -- Limitadores para a tabela `eea_host_institutions`
        --
        ALTER TABLE `eea_host_institutions`
          ADD CONSTRAINT `id_participation` FOREIGN KEY (`id_participation`) REFERENCES `eea_participation` (`id_participation`) ON DELETE CASCADE ON UPDATE CASCADE;
    ";

    dbDelta($fks);

    $fks = "
        --
        -- Limitadores para a tabela `eea_members`
        --
        ALTER TABLE `eea_members`
          ADD CONSTRAINT `id_coordenador` FOREIGN KEY (`id_coordenador`) REFERENCES `eea_coordinator` (`id_coordenador`) ON DELETE CASCADE ON UPDATE CASCADE;
    ";

    dbDelta($fks);

    $fks = "
        --
        -- Limitadores para a tabela `eea_partnerships`
        --
        ALTER TABLE `eea_partnerships`
          ADD CONSTRAINT `id_participation2` FOREIGN KEY (`id_participation`) REFERENCES `eea_participation` (`id_participation`) ON DELETE CASCADE ON UPDATE CASCADE;
    ";
    dbDelta($fks);
}
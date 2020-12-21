package com.Tasks.Model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.validation.annotation.Validated;

@Validated
@Entity
@Table(name="taks")
public class Task  {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Id", unique = true, nullable = false)
	private long Id;
	

	@Column(name="Description", nullable = false)
	private String Description;
	
	@Column(name="DateCreated", nullable = false)
	private Date DateCreated;
	
	@Column(name="IsValidity", nullable = false)
	private Boolean IsValidity;
	
	public Task() {
		super();
		
	}
	
	/**
	 * @return the id
	 */
	
	public long getId() {
		return Id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		Id = id;
	}
	/**
	 * @return the description
	 */
	public String getDescription() {
		return Description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		Description = description;
	}
	/**
	 * @return the dateCreated
	 */
	public Date getDateCreated() {
		return DateCreated;
	}
	/**
	 * @param dateCreated the dateCreated to set
	 */
	public void setDateCreated(Date dateCreated) {
		DateCreated = dateCreated;
	}
	/**
	 * @return the isValidity
	 */
	public Boolean getIsValidity() {
		return IsValidity;
	}
	/**
	 * @param isValidity the isValidity to set
	 */
	public void setIsValidity(Boolean isValidity) {
		IsValidity = isValidity;
	}
}